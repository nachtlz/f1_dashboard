import CircuitModel from '../models/CircuitModel.js';
import DriverModel from '../models/DriverModel.js';
import RaceModel from '../models/RaceModel.js';
import ResultModel from '../models/ResultModel.js'
import Team from '../models/TeamModel.js';
import { Sequelize as sequelize  } from 'sequelize';

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
            idRace: result.RACE.idRace,
            points: result.points,
            name: result.RACE.CIRCUIT.name,
        }));

        res.json(formattedResults);
    } catch (error) {
        res.json({ message: error.message });
    }
}
export const getResultFromRace=async(req,res)=>{
    try{
        const result= await ResultModel.findAll({
            include : {
                model : DriverModel,
                attributes : ['name','lastName'],
                required : true
            },
            where : {idRace : req.params.idRace},
            order: [['points', 'desc']],
        })
        res.json(result);
    }catch(error){
        res.json({message : error.message});
    }
}

export const getAllResultFromDriver = async (req, res) => {
    try {
        const results = await ResultModel.findAll({
            include: [
                {
                    model: RaceModel,
                    required: true,
                    include: [
                        {
                            model: CircuitModel,
                            required : true
                        },
                    ],
                },
            ],
            where: { idDriver: req.params.idDriver },
        });

        // Formatear la respuesta para seleccionar solo puntos y nombre del circuito
        const formattedResults = results.map(result => ({
            points: result.points,
            laps: result.laps,
            status: result.status,
            position: result.position,
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
};
export const getStatusFromRace=async(req,res)=>{
    try{
        const results=await ResultModel.count({
            include :{
                model : RaceModel,
                attributes:['name'],
                required : true
            },
            where :{idRace : req.params.idRace},
            group : ['idRace','RACE.name','status'],

        });
        const formattedResults = results.map(result => ({
            status: result.status,
            count: result.count,
        }));
        res.json(formattedResults);

    }catch(error){
        res.json({message : error.message});
    }

}

export const getWinTeam = async (req, res) => {
    try {
      const result = await ResultModel.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('Driver.Team.name')), 'count'],
          [sequelize.col('Driver.Team.name'), 'teamName'], // Agrega esta línea
        ],
        include: [
          {
            model: DriverModel,
            attributes: [],
            include: [
              {
                model: Team,
                attributes: ['name'],
              },
            ],
          },
        ],
        where: {
          position: 1,
        },
        group: ['teamName','DRIVER.TEAM.idTeam'], // Ajusta la cláusula GROUP BY
        order: [[sequelize.literal('count'), 'DESC']],
      });
  
      res.json({ totalWins: result });
    } catch (error) {
      res.json({ message: error.message });
    }
  };
  