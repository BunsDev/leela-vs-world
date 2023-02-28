/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface ValidatorInterface extends utils.Interface {
  functions: {
    "INPUT_LEN()": FunctionFragment;
    "MODULUS()": FunctionFragment;
    "OUTPUT_LEN()": FunctionFragment;
    "TWO_INV()": FunctionFragment;
    "chessContract()": FunctionFragment;
    "hashInputs(uint256[112])": FunctionFragment;
    "hashOutputChunk(uint256[],uint16,uint16)": FunctionFragment;
    "inputHash()": FunctionFragment;
    "lastChunkEndIndex()": FunctionFragment;
    "legalMoveIndicies(uint256)": FunctionFragment;
    "moveMapArray(uint256)": FunctionFragment;
    "nextLegalMoveIndex()": FunctionFragment;
    "outputHash()": FunctionFragment;
    "poseidonContract()": FunctionFragment;
    "resetOutputHashing()": FunctionFragment;
    "reverseMoveMap(uint256)": FunctionFragment;
    "setLegalMoveIndicies(uint16[])": FunctionFragment;
    "verifierContract()": FunctionFragment;
    "verify(bytes,bytes)": FunctionFragment;
    "winningMoveIndex()": FunctionFragment;
    "winningMoveValue()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "INPUT_LEN"
      | "MODULUS"
      | "OUTPUT_LEN"
      | "TWO_INV"
      | "chessContract"
      | "hashInputs"
      | "hashOutputChunk"
      | "inputHash"
      | "lastChunkEndIndex"
      | "legalMoveIndicies"
      | "moveMapArray"
      | "nextLegalMoveIndex"
      | "outputHash"
      | "poseidonContract"
      | "resetOutputHashing"
      | "reverseMoveMap"
      | "setLegalMoveIndicies"
      | "verifierContract"
      | "verify"
      | "winningMoveIndex"
      | "winningMoveValue"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "INPUT_LEN", values?: undefined): string;
  encodeFunctionData(functionFragment: "MODULUS", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "OUTPUT_LEN",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "TWO_INV", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "chessContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "hashInputs",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "hashOutputChunk",
    values: [
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "inputHash", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "lastChunkEndIndex",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "legalMoveIndicies",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "moveMapArray",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "nextLegalMoveIndex",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "outputHash",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "poseidonContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "resetOutputHashing",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "reverseMoveMap",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setLegalMoveIndicies",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "verifierContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "verify",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "winningMoveIndex",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "winningMoveValue",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "INPUT_LEN", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "MODULUS", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "OUTPUT_LEN", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TWO_INV", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "chessContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hashInputs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "hashOutputChunk",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "inputHash", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lastChunkEndIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "legalMoveIndicies",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "moveMapArray",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nextLegalMoveIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "outputHash", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "poseidonContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "resetOutputHashing",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "reverseMoveMap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setLegalMoveIndicies",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifierContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "winningMoveIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "winningMoveValue",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Validator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ValidatorInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    INPUT_LEN(overrides?: CallOverrides): Promise<[BigNumber]>;

    MODULUS(overrides?: CallOverrides): Promise<[BigNumber]>;

    OUTPUT_LEN(overrides?: CallOverrides): Promise<[BigNumber]>;

    TWO_INV(overrides?: CallOverrides): Promise<[BigNumber]>;

    chessContract(overrides?: CallOverrides): Promise<[string]>;

    hashInputs(
      inputs: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    hashOutputChunk(
      outputChunk: PromiseOrValue<BigNumberish>[],
      chunkStart: PromiseOrValue<BigNumberish>,
      chunkEnd: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    inputHash(overrides?: CallOverrides): Promise<[BigNumber]>;

    lastChunkEndIndex(overrides?: CallOverrides): Promise<[BigNumber]>;

    legalMoveIndicies(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    moveMapArray(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    nextLegalMoveIndex(overrides?: CallOverrides): Promise<[number]>;

    outputHash(overrides?: CallOverrides): Promise<[BigNumber]>;

    poseidonContract(overrides?: CallOverrides): Promise<[string]>;

    resetOutputHashing(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    reverseMoveMap(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    setLegalMoveIndicies(
      _legalMoves: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    verifierContract(overrides?: CallOverrides): Promise<[string]>;

    verify(
      proof: PromiseOrValue<BytesLike>,
      instances: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    winningMoveIndex(overrides?: CallOverrides): Promise<[BigNumber]>;

    winningMoveValue(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  INPUT_LEN(overrides?: CallOverrides): Promise<BigNumber>;

  MODULUS(overrides?: CallOverrides): Promise<BigNumber>;

  OUTPUT_LEN(overrides?: CallOverrides): Promise<BigNumber>;

  TWO_INV(overrides?: CallOverrides): Promise<BigNumber>;

  chessContract(overrides?: CallOverrides): Promise<string>;

  hashInputs(
    inputs: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  hashOutputChunk(
    outputChunk: PromiseOrValue<BigNumberish>[],
    chunkStart: PromiseOrValue<BigNumberish>,
    chunkEnd: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  inputHash(overrides?: CallOverrides): Promise<BigNumber>;

  lastChunkEndIndex(overrides?: CallOverrides): Promise<BigNumber>;

  legalMoveIndicies(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<number>;

  moveMapArray(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<number>;

  nextLegalMoveIndex(overrides?: CallOverrides): Promise<number>;

  outputHash(overrides?: CallOverrides): Promise<BigNumber>;

  poseidonContract(overrides?: CallOverrides): Promise<string>;

  resetOutputHashing(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  reverseMoveMap(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<number>;

  setLegalMoveIndicies(
    _legalMoves: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  verifierContract(overrides?: CallOverrides): Promise<string>;

  verify(
    proof: PromiseOrValue<BytesLike>,
    instances: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  winningMoveIndex(overrides?: CallOverrides): Promise<BigNumber>;

  winningMoveValue(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    INPUT_LEN(overrides?: CallOverrides): Promise<BigNumber>;

    MODULUS(overrides?: CallOverrides): Promise<BigNumber>;

    OUTPUT_LEN(overrides?: CallOverrides): Promise<BigNumber>;

    TWO_INV(overrides?: CallOverrides): Promise<BigNumber>;

    chessContract(overrides?: CallOverrides): Promise<string>;

    hashInputs(
      inputs: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    hashOutputChunk(
      outputChunk: PromiseOrValue<BigNumberish>[],
      chunkStart: PromiseOrValue<BigNumberish>,
      chunkEnd: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    inputHash(overrides?: CallOverrides): Promise<BigNumber>;

    lastChunkEndIndex(overrides?: CallOverrides): Promise<BigNumber>;

    legalMoveIndicies(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;

    moveMapArray(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;

    nextLegalMoveIndex(overrides?: CallOverrides): Promise<number>;

    outputHash(overrides?: CallOverrides): Promise<BigNumber>;

    poseidonContract(overrides?: CallOverrides): Promise<string>;

    resetOutputHashing(overrides?: CallOverrides): Promise<void>;

    reverseMoveMap(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;

    setLegalMoveIndicies(
      _legalMoves: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    verifierContract(overrides?: CallOverrides): Promise<string>;

    verify(
      proof: PromiseOrValue<BytesLike>,
      instances: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<number>;

    winningMoveIndex(overrides?: CallOverrides): Promise<BigNumber>;

    winningMoveValue(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    INPUT_LEN(overrides?: CallOverrides): Promise<BigNumber>;

    MODULUS(overrides?: CallOverrides): Promise<BigNumber>;

    OUTPUT_LEN(overrides?: CallOverrides): Promise<BigNumber>;

    TWO_INV(overrides?: CallOverrides): Promise<BigNumber>;

    chessContract(overrides?: CallOverrides): Promise<BigNumber>;

    hashInputs(
      inputs: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    hashOutputChunk(
      outputChunk: PromiseOrValue<BigNumberish>[],
      chunkStart: PromiseOrValue<BigNumberish>,
      chunkEnd: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    inputHash(overrides?: CallOverrides): Promise<BigNumber>;

    lastChunkEndIndex(overrides?: CallOverrides): Promise<BigNumber>;

    legalMoveIndicies(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    moveMapArray(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nextLegalMoveIndex(overrides?: CallOverrides): Promise<BigNumber>;

    outputHash(overrides?: CallOverrides): Promise<BigNumber>;

    poseidonContract(overrides?: CallOverrides): Promise<BigNumber>;

    resetOutputHashing(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    reverseMoveMap(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setLegalMoveIndicies(
      _legalMoves: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    verifierContract(overrides?: CallOverrides): Promise<BigNumber>;

    verify(
      proof: PromiseOrValue<BytesLike>,
      instances: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    winningMoveIndex(overrides?: CallOverrides): Promise<BigNumber>;

    winningMoveValue(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    INPUT_LEN(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MODULUS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    OUTPUT_LEN(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TWO_INV(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    chessContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    hashInputs(
      inputs: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    hashOutputChunk(
      outputChunk: PromiseOrValue<BigNumberish>[],
      chunkStart: PromiseOrValue<BigNumberish>,
      chunkEnd: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    inputHash(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lastChunkEndIndex(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    legalMoveIndicies(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    moveMapArray(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nextLegalMoveIndex(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    outputHash(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    poseidonContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    resetOutputHashing(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    reverseMoveMap(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setLegalMoveIndicies(
      _legalMoves: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    verifierContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    verify(
      proof: PromiseOrValue<BytesLike>,
      instances: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    winningMoveIndex(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    winningMoveValue(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}