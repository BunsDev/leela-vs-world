

use halo2_machinelearning::{felt_from_i64, felt_to_i64};
use halo2_base::{halo2_proofs::{arithmetic::FieldExt, plonk::{Error as PlonkError}, circuit::Value, halo2curves::bn256::Fr, poly::{commitment::ParamsProver}, dev::MockProver}, utils::value_to_option};
use ndarray::{Array};

use leela_circuit::{input_parsing::read_input, LeelaCircuit, OUTPUT, HASH_INPUT, HASH_OUTPUT};



fn main() -> Result<(), PlonkError> {
    println!("{:?}", Fr::MODULUS);
    println!("{:?}", Fr::TWO_INV);
    const PREFIX: &str = "/home/ubuntu/leela_zk/";
    let params = read_input(PREFIX, "bgnet.json");


    let (input, output): (Vec<Fr>, Vec<Fr>) = {
        let inputs_raw = std::fs::read_to_string(PREFIX.to_owned() + "bgnet_intermediates_new.json").unwrap();
        let inputs = json::parse(&inputs_raw).unwrap();
        let input: Vec<_> = inputs["input"].members().map(|input| felt_from_i64(input.as_i64().unwrap())).collect();

        let outputs: Vec<_> = inputs["output"].members().map(|input| felt_from_i64(input.as_i64().unwrap())).collect();
        (input, outputs)
    };
    let input_values: Vec<_> = input.iter().map(|x| Value::known(*x)).collect();
    let input_array = Array::from_shape_vec(112, input_values).unwrap();


    let circuit = LeelaCircuit {
        input: input_array,
        params,
        input_hash: None,
        output_hash: None
    };

    let mock = {
        let input_instance = vec![vec![Fr::one(), Fr::one()]];

        MockProver::run(20, &circuit, input_instance).unwrap();
        
        // OUTPUT.get().unwrap().iter().map(|output| {
        //     output.map(|x| felt_to_i64(x))
        // }).enumerate().for_each(|(index, output_calc)| {
        //     println!("output calc for index {} is {:?}", index, output_calc);
        // });

        let input_hash = value_to_option(*HASH_INPUT.get().unwrap()).unwrap();
        let output_hash = value_to_option(*HASH_OUTPUT.get().unwrap()).unwrap();

        let prover = MockProver::run(20, &circuit, vec![vec![input_hash, output_hash]]).unwrap();

        prover.assert_satisfied();
    };

    // let now = Instant::now();

    // let params: ParamsKZG<Bn256> = ParamsProver::new(17);

    // println!("params generated in {}", now.elapsed().as_secs_f32());

    // let now = Instant::now();

    // let vk = keygen_vk(&params, &circuit).unwrap();

    // println!("vk generated in {}", now.elapsed().as_secs_f32());

    // let now = Instant::now();

    // let pk = keygen_pk(&params, vk, &circuit).unwrap();

    // println!("pk generated in {}", now.elapsed().as_secs_f32());

    // let mut transcript = Blake2bWrite::<_, _, Challenge255<_>>::init(vec![]);

    // let now = Instant::now();

    // println!("starting proof!");

    // create_proof::<_, ProverSHPLONK<Bn256>, _, _, _, _>(
    //     &params,
    //     &pk,
    //     &[circuit],
    //     &[&[input.as_slice(), output.as_slice()]],
    //     OsRng,
    //     &mut transcript,
    // )?;

    // println!("proof generated in {}", now.elapsed().as_secs_f32());

    // let proof = transcript.finalize();
    // //println!("{:?}", proof);
    // let now = Instant::now();
    // let strategy = SingleStrategy::new(&params);
    // let mut transcript = Blake2bRead::<_, _, Challenge255<_>>::init(&proof[..]);

    // verify_proof::<_, VerifierSHPLONK<Bn256>, _, _, _>(
    //     &params,
    //     pk.get_vk(),
    //     strategy,
    //     &[&[input.as_slice(), output.as_slice()]],
    //     &mut transcript,
    // )?;
    // println!("Verification took {}", now.elapsed().as_secs());

    // use plotters::prelude::*;
    // let root = BitMapBackend::new("leela_circuit.png", (1024*4, 3096*4)).into_drawing_area();
    // root.fill(&WHITE).unwrap();
    // let root = root.titled("leela_circuit", ("sans-serif", 60)).unwrap();
    // halo2_base::halo2_proofs::dev::CircuitLayout::default().render(20, &circuit, &root).unwrap();

    println!("Done!");
    Ok(())
}
