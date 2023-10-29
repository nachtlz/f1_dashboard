import db from "../database/db";
import { DataTypes } from "sequelize";
import TeamModel from './TeamModel';

const DriverModel=db.define("DRIVER",{
    idDriver : {
        type : DataTypes.INTEGER,
        primaryKey : true
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
