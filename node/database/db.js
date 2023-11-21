import {Sequelize} from 'sequelize'

const db = new Sequelize('f1_dashboard', 'root', 'root',{
    host:'localhost',
    dialect: 'mysql',
    dialectOptions: {
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
      }
})

export default db