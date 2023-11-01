import db from "../database/db.js";
import { DataTypes } from "sequelize";
import TeamModel from './TeamModel.js';

const DriverModel=db.define("DRIVER",{
    idDriver : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : false

    },
    name : {
        type : DataTypes.STRING
    },
    lastname : {
        type : DataTypes.STRING
    },
    nationality : {
        type : DataTypes.STRING
    },
    code : {
        type : DataTypes.CHAR
    },
    number : {
        type : DataTypes.INTEGER
    },
    imagen : {
        type : DataTypes.STRING
    },
    idTeam : {
        type : DataTypes.INTEGER,
        references : {
            model : TeamModel,
            key : 'idTeam'
        }
    }
}, {
    tableName : 'DRIVER',
    timestamps : false
})
DriverModel.belongsTo(TeamModel, {foreignKey : 'idTeam'});
export default DriverModel;
