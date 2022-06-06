const Sequelize = require('sequelize');

const db = new Sequelize('db_upTask', 'uptask', 'uptask{}963',
   {
      host: '137.184.115.179',
      dialect: 'mysql',
      port: 3306,
      operatorsAliases: false,
      define: {
         timestamps: false
      },

      pool:{
         max: 5,
         min: 0,
         acquire: 30000,
         idle: 10000
      }

   });

   module.exports = db;