import TeamModel from '../models/TeamModel.js';

export const getTeams = async (req, res) => {
    try {
        const result=await TeamModel.findAll();
        res.json(result)
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getTeamFromID = async (req, res) => {
    try {
        const result = await TeamModel.findOne({
            where: { idTeam: req.params.idTeam }
        });
        res.json(result);

    } catch (error) {
        res.json({ meesage: error.message })
    }
}