import { where } from 'sequelize';
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
            imagenReal : result.CIRCUIT.imagenReal,
            imagenCircuit : result.CIRCUIT.imagenCircuit,
        };
        res.json(formattedResult);

    }catch(error){
        res.json({message : error.message});
    }
}

export const getRaceAndCircuitFromCircuit = async (req, res) => {
    try {
      const results = await RaceModel.findAll({
        include: CircuitModel,
        required: true,
        where : {idCircuit : req.params.idCircuit}
      });
  
      if (results.length > 0) {
        const formattedResults = results.map((result) => ({
          idRace : result.idRace,
          nameRace: result.name,
          dateRace: result.date,
          idCircuit : result.CIRCUIT.idCircuit,
          nameCircuit: result.CIRCUIT.name,
          laps: result.CIRCUIT.laps,
          location: result.CIRCUIT.location,
          country: result.CIRCUIT.country,
          imagenReal: result.CIRCUIT.imagenReal,
          imagenCircuit: result.CIRCUIT.imagenCircuit,
        }));
  
        res.json(formattedResults);
      } else {
        res.json({ message: "No se encontraron resultados" });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  };
  
  export const getRaceAndCircuit = async (req, res) => {
    try {
      const results = await RaceModel.findAll({
        include: CircuitModel,
        required: true,
      });
  
      if (results.length > 0) {
        const formattedResults = results.map((result) => ({
          idRace : result.idRace,
          nameRace: result.name,
          dateRace: result.date,
          idCircuit : result.CIRCUIT.idCircuit,
          nameCircuit: result.CIRCUIT.name,
          laps: result.CIRCUIT.laps,
          location: result.CIRCUIT.location,
          country: result.CIRCUIT.country,
          imagenReal: result.CIRCUIT.imagenReal,
          imagenCircuit: result.CIRCUIT.imagenCircuit,
        }));
  
        res.json(formattedResults);
      } else {
        res.json({ message: "No se encontraron resultados" });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  };