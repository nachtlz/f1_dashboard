import db from "../database/db.js";
import { DataTypes } from "sequelize";

const RaceModel = db.define('RACE', {

    idRace: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    name: { type: DataTypes.STRING },

    date: { type: DataTypes.DATE }
}, {
    tableName: "RACE",
    timestamps: false
});
export default RaceModel;