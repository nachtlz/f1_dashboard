import CircuitModel from '../models/CircuitModel.js';
import RaceModel from '../models/RaceModel.js';
import ResultModel from '../models/ResultModel.js'

export const getResultFromDriver = async (req, res) => {
    try {
        const results = await ResultModel.findAll({
            include: [
                {
                    model: RaceModel,
                    required: true,
                    attributes: ['idRace'],
                    include: [
                        {
                            model: CircuitModel,
                            attributes: ['name'],
                            required : true
                        },
                    ],
                },
            ],
            attributes: ['points'],
            where: { idDriver: req.params.idDriver },
        });

        // Formatear la respuesta para seleccionar solo puntos y nombre del circuito
        const formattedResults = results.map(result => ({
            points: result.points,
            name: result.RACE.CIRCUIT.name,
        }));

        res.json(formattedResults);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getStatusRace=async(req,res)=>{
    try{
        const results=await ResultModel.count({
            include :{
                model : RaceModel,
                attributes:['name'],
                required : true
            },
            group : ['idRace','RACE.name','status'],

        });
        res.json(results);
    }catch(error){
        res.json({message : error.message});
    }
}
