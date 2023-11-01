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