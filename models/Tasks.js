const Sequelize = require('sequelize');
const db = require('../config/db');
const Projects = require('./Projects')

const Tasks = db.define('tareas', {
    id: {
       type: Sequelize.INTEGER(11),
       primaryKey: true,
       autoIncrement: true
    },
    tarea: {
       type: Sequelize.STRING(100)
    },
    estado:  {
       type: Sequelize.INTEGER(1)
    },
});
Tasks.belongsTo(Projects);

module.exports = Tasks;