import db from "../database/db.js";
import { DataTypes } from "sequelize";

const Team = db.define('TEAM', {
    idTeam: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: { type: DataTypes.STRING },
    nationality: { type: DataTypes.STRING },
    imagen : {type : DataTypes.STRING}
},{
    tableName : 'TEAM',
    timestamps : false
})
export default Team;