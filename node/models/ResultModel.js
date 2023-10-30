import db from "../database/db.js";
import { DataTypes } from "sequelize";
import RaceModel from "./RaceModel";
import DriverModel from "./DriverModel";

const ResultModel=db.define('RESULT',{
    idRace : {
        type : DataTypes.INTEGER,
        references : {
            model : RaceModel,
            key : 'idRace'
        }
    },
    idDriver : {
        type : DataTypes.INTEGER,
        references : {
            model : DriverModel,
            key : 'idDriver'
        }
    },
    grid : {
        type : DataTypes.INTEGER
    },
    position : {
        type : DataTypes.INTEGER
    },
    points : {
        type : DataTypes.INTEGER
    },
    laps : {
        type : DataTypes.INTEGER
    },
    time : {
       type: DataTypes.STRING
    },
    status : {
        type : DataTypes.STRING
    }
},{
    tableName : 'RESULT',
    timestamps : false
});

ResultModel.belongsTo(RaceModel,{foreignKey : 'idRace'});
ResultModel.belongsTo(DriverModel,{foreignKey : 'idDriver'})

export default ResultModel;
