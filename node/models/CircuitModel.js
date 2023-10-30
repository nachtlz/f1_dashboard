import db from "../database/db.js";
import { DataTypes } from "sequelize";

const CircuitModel = db.define("CIRCUIT", {
    idCircuit: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: { type: DataTypes.STRING },
    laps: { type: DataTypes.INTEGER },
    location: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING }
}, {
    tableName: "CIRCUIT",
    timestamps: false
})
export default CircuitModel;