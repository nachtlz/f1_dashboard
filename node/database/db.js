import {Sequelize} from 'sequelize'

const db = new Sequelize('f1_dashboard', 'root', '',{
    host:'localhost',
    dialect: 'mysql'
})

export default db