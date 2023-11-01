import db from "../database/db.js";
import CircuitModel from "./CircuitModel.js";
import { DataTypes } from "sequelize";

const RaceModel = db.define('RACE', {

    idRace: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : false

    },

    name: { type: DataTypes.STRING },

    date: { type: DataTypes.DATE },
    idCircuit : {
        type : DataTypes.INTEGER,
        references : {
            model : CircuitModel,
            key : 'idCircuit'
        }
    }
}, {
    tableName: "RACE",
    timestamps: false
});
RaceModel.belongsTo(CircuitModel , {foreignKey : 'idCircuit'})
export default RaceModel;