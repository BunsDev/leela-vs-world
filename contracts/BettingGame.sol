pragma solidity >=0.8.0;

import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

import "./leela.sol";
import "./chess.sol";
import "./Utils.sol";
// emit play move events with dict
// emit staked/voted events with dict and the stake and the move
// emit game end events with dict
// call the initilize game with the chess contract
/// @title BettingGame
/// @dev Betting game contract for Leela Chess Zero vs. World
///      This contract is an individual game engine that includes the betting & payout logic.
contract BettingGame is Ownable {
    /// NOTE: Variables are laid out in this particular order to pack them
    //        in as little storage slots as possible. This saves gas!
    //        See https://docs.soliditylang.org/en/v0.8.0/internals/layout_in_storage.html
    //
    //        slot 1: 96 + 16 + 8 + 8 + 8 + 16 + 16 (88 left)
    //        ...

    /// @dev Minimum stake for a bet
    address constant CHESS_ADDRESS = 0x0; // TO FILL IN
    address constant LEELA_ADDRESS = 0x0; 
    uint16 leelaMove;
    uint96 public minStake = 0.01 ether; // 0.01 * 10^18 ==> ether 10^18

    uint16 public gameIndex = 0;

    uint16 public moveIndex = 0;

    /// @dev For reentrancy guard (use uint8 for gas saving & storage packing vs. bool)
    uint8 private locked = 0;

    /// @dev Stake period deadline (uint256 for convenience when using block.timestamp)
    uint256 public votePeriodEnd;

    /// @dev Stake period duration, default 60 mins
    uint256 public votePeriodDuration = 3600;

    /// @dev Move period duration, default 5 mins
    uint256 public movePeriodDuration = 300;

    /// @dev World / Leela pool size (uint128 for storage packing)
    uint96 public worldPoolSize; 
    uint96 public leelaPoolSize; 
    uint96 public initVal;


    mapping(address => uint96) public accountsPayable;
    // no tracking list needed, state global across games

    /// @dev User stakes on the World / Leela. Private to keep stake size only visible to each user.
    //state local across games
    mapping (uint16 => mapping(address => uint96)) public worldStakes;
    // mapping (uint16 => uint16[]) public worldStakesList;
    mapping (uint16 => mapping(address => uint96)) public leelaStakes;
    // mapping (uint16 => uint16[]) public leelaStakesList;

    /// @dev User stakes on the World / Leela. Private to keep stake size only visible to each user.
    //state local across games
    mapping (uint16 => mapping(address => uint96)) public worldShares;
    // mapping (uint16 => uint16[]) public worldSharesList;
    mapping (uint16 => mapping(address => uint96)) public leelaShares;
    // mapping (uint16 => uint16[]) public leelaSharesList;

    /// @dev the total number of shares in the contract, used to calculate the payout
    uint96 public totalLeelaShares;
    mapping (uint16 => uint96) public totalWorldShares;

    bool public leelaColor;
    /// @dev moveIndex maps to a mapping of key: move (uint16, valid only) & value: # of votes.
    ///      Limited to 2^16-1 = 65535 votes per move option per moveIndex.
    mapping (uint16 => mapping (uint16 => mapping(uint16 => uint96))) public movesToVotes; 

    /// @dev moveIndex maps to a dynamic array of all moves voted for the World.
    ///      Used to iterate through worldMoves
    mapping (uint16 => mapping (uint16 => uint16[])) registeredMoves; 

    /// @dev Keeping track of who voted on what move for the World. the key is the move index
    mapping (uint16 => mapping(uint16 => mapping(address => uint16))) public voters;
    mapping (uint16 => mapping (address => bool)) public votersMap;
    mapping (uint16 => uint256[]) public votersList;// TODO attatch this
    // mapping (uint16 => mapping(uint16 => address[])) public votersList;

    /// @dev Chess board contract
    Chess public chess;

    /// @dev Leela AI contract
    Leela public leela;

    event movePlayed(uint16 worldMove, uint16 leelaMove);

    event stakeMade(address player, bool leelaSide);

    event voteMade(address player, uint16 move);

    event gameStart(bool leelaColor);

    event gameEnd(bool leelaWon);

    modifier nonReentrancy() {
        require(locked == 0, 'ReentrancyGuard: reentrant call');
        locked = 1;
        _;
        locked = 0;
    }

    constructor(address _chess, address _leela, uint96 intialPoolSize) {
        chess = Chess(_chess); // not sure if this is right
        chess.initializeGame();
        leela = Leela(_leela);
        leela.initializeLeela();
        leelaPoolSize = intialPoolSize;
        worldPoolSize = intialPoolSize;
        initVal = intialPoolSize;
        leelaColor = false;
    }
    function checkTimer() returns (bool) {
        return (votePeriodEnd != 0 && block.timestamp > votePeriodEnd);
    }
    function setChess(address _chess) public onlyOwner {
        chess = Chess(_chess);
    }

     function setLeela(address _leela) public onlyOwner {
        leela = Chess(_leela);
    }

    function setMinStake(uint256 _minStake) public onlyOwner{
        minStake = _minStake;
    }

    function setPoolSize(uint256 _a) public onlyOwner{
        require((leelaPoolSize == initVal) && (worldPoolSize == initVal), "Cannot modify pool size once pools are nonempty.");
        leelaPoolSize = _a;
        worldPoolSize = _a;
        initVal = _a;
    }
    /// @dev Modify staking duration.
    function setVotePeriod(uint256 d) public onlyOwner {
        votePeriodDuration = d;
    }

    /// @dev Start staking period, can be called multiple times to delay the end of staking period.
    function startVoteTimer() internal{
        votePeriodEnd = block.timestamp + votePeriodDuration;
    }

    /// @dev Stakes a bet on Leela or World for the game, called by user.
    ///      Only allows bet on one side for each user.
    /// @todo: Only ETH stake or any ERC-20 as well? Below impl is only ETH
    function addStake(bool leelaSide) public payable nonReentrancy {
        require(msg.value >= minStake, 'Received ETH is less than min stake');

        // Unchecked because user won't have enough ETH to overflow
        if (!leelaSide) {
            // require(leelaBets[msg.sender] == 0, 'User already bet on other side');
            // map address ->
            //I like the economics of betting arbitrage. I would love for arbitragers to bet on both sides and collect the reward before game end.
            unchecked { 
                worldStakes[gameIndex][msg.sender] += msg.value;
                worldShares[gameIndex][msg.sender] += msg.value*initVal/worldPoolSize;
                totalWorldShares += msg.value*initVal/worldPoolSize;
                worldPoolSize += msg.value;
            }
        } else {
            // require(worldBets[msg.sender] == 0, 'User already bet on other side');
            unchecked {
                leelaStakes[gameIndex][msg.sender] += msg.value;
                leelaShares[gameIndex][msg.sender] += msg.value*initVal/leelaPoolSize;
                totalLeelaShares += msg.value*initVal/leelaPoolSize;
                leelaPoolSize += msg.value;
            }
        }
        if (!votersMap[gameIndex][msg.sender]){
            votersMap[gameIndex][msg.sender] = true;
            votersList[gameIndex].push(msg.sender);
        }
        emit stakeMade(msg.sender, leelaSide);
        bool timerOver= checkTimer();
        if (timeOver) {
            makeMove();
        }
    }
   
    /// @dev For voting on a move for the World
    /// TODO: Should we give more voting weight for users with more stake? (stake-dependent voting weight)
    ///       Should we let ONLY the users who staked on the World vote? (because Leela stakers are biased for Leela) -- NO
    function voteWorldMove(uint16 move) public nonReentrancy {
        // Verify the move is valid, reverts if invalid.
        // Skip if 0x1000, 0x2000, 0x3000 (request draw, accept draw, resign)
        require(move != 0, 'Invalid move'); // 0 == 0x0000
        require(voters[gameIndex][moveIndex][msg.sender] == 0, 'User already voted for this move index');
        if (move != 0x1000 && move != 0x2000 && move != 0x3000) {
            checkMove(chess.gameState, move, chess.world_state, chess.leela_state, true);
        }
        // Save the move if it's the first vote for the move
        if (movesToVotes[gameIndex][moveIndex][move] == 0) {
            registeredMoves[gameIndex][moveIndex].push(move);
        }
        // Increment vote count for the move
        // NOTE: intentional in adding both stakes to the world's move
        movesToVotes[gameIndex][moveIndex][move] += worldStakes[gameIndex][msg.sender]+leelaStakes[gameIndex][msg.sender];
        voters[gameIndex][moveIndex][msg.sender] = move; 
        emit voteMade(msg.sender, move);
        bool timerOver= checkTimer();
        if (timeOver) {
            makeMove();
        }
    }

    //TODO cleanup function, end game function, timer check, endgame handler plus check, playmove check, grab past moves, 


    // /// @dev Commits Leela's move
    // function commitLeelaMove(uint16 move) public onlyOwner {
    //     leelaMoveUpdated = chess.moveIndex;
    //     leelaMove = move;
    // }

    /// @dev Get the most voted move for the World
    function getWorldMove() public view returns (uint16) {
        uint16 move; // default 0x0000

        // store vars in memory to minimize storage reads (SSLOAD)
        uint16 idx = chess.moveIndex;
        uint16[] memory registered = registeredMoves[gameIndex][moveIndex];
        uint16 maxVotes = 0;

        for (uint32 i = 0; i < registered.length;) {
            uint16 votes = movesToVotes[gameIndex][registered[i]];
            if (votes > maxVotes) {
                move = registered[i];
                maxVotes = votes;
            } 
            unchecked {
                i++; // save gas since # of moves per moveIndex won't overflow 2^32-1
            }
        }

        return move;
    }

    /// @dev For executing the most voted move for the World
    /// NOTE: side 0 is the World, 1 is Leela
    function makeMove() internal nonReentrancy {
        uint16 worldMove = getWorldMove();
        uint15 _leelaMove = leela.getMove();
        leelaMove = _leelaMove;
        chess.playMove(
            chess.gameState,
            move,
            chess.world_state,
            chess.leela_state,
            isWorld
        );
        bool isGameEnded = chess.checkEndgame();
        if (isGameEnded){
            updateAccounts(false);
            emit playedMove(move, 0);
            emit gameEnd(false);
            resetGame();
            moves.push(move);
            return;
        }
        chess.playMove(
            chess.gameState,
            leelaMove,
            chess.leela_state,
            chess.world_state,
            !isWorld
        );

        emit playedMove(move, leelaMove);
        moves.push(move);
        moves.push(leelaMove);
        bool isGameEnded = chess.checkEndgame();
        if (isGameEnded){
            updateAccounts(true);
            resetGame();
            emit gameEnd(true);
            return;
        }
        resetMove();
    }

    function resetMove(){
        moveIndex = moves.length;
        startVoteTimer();
    }
    
    function resetGame(){
        worldPoolSize = initVal;
        leelaPoolSize = initVal;
        gameIndex++;
        moveIndex = 0;
        leelaColor = !leelaColor;
        chess.initializeGame();
        leela.initializeLeela();
        emit gameStart();
        startVoteTimer();
    }
    
    function updateAccounts(bool leelaWon) internal {
        // TODO convert integers to floating numbers when appropriate
        mapping (address => uint96) winningAccounts = leelaWon ? leelaShares[gameIndex] : worldShares[gameIndex];
        uint256 totalShares = leelaWon? totalLeelaShares : totalWorldShares; 
        address[] voters = votersList[gameIndex];
        for (int i = 0;i<voters.length; i++){
            address accountShares = voters[i];
            uint96 totalPayout = leelaPoolSize+worldPoolSize - 2*initVal;
            accountsPayable[account]+= accountShares* (totalPayout)/(totalShares);
        }
    }
    function claimPayout() public {
        // TODO not sure if this logic is correct
        uint payoutAmount;
        require(accountsPayable[msg.sender]>=payoutAmount);
        accountsPayable[msg.sender] -= payoutAmount;
        (bool sent, ) = msg.sender.call{value: payoutAmount}('');
        require(sent, 'Failed to send payout.');
        // don't need to emit an event bc the payout is sent over the blockchain
    }

    // for payable, leave as-is
    fallback() external payable {}
    receive() external payable {}
}
