import CircuitModel from '../models/CircuitModel.js';
import RaceModel from '../models/RaceModel.js';

export const getRaces = async (req, res) => {
    try {
        const result=await RaceModel.findAll();
        res.json(result)
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getRaceFromId = async (req, res) => {
    try {
        const result = await RaceModel.findOne({
            where: { idRace: req.params.idRace }
        });
        res.json(result);

    } catch (error) {
        res.json({ meesage: error.message })
    }
}

export const getCircuitFromRace = async(req,res)=>{
    try{
        const result = await RaceModel.findOne({
            include : {
                model : CircuitModel,
                required : true,
            },
            where : {idRace : req.params.idRace}
        });
        const formattedResult = {
            name: result.name,
            date: result.date,
            nameCircuit: result.CIRCUIT.name,
            laps: result.CIRCUIT.laps,
            location: result.CIRCUIT.location,
            country: result.CIRCUIT.country,
        };
        res.json(formattedResult);

    }catch(error){
        res.json({message : error.message});
    }
}