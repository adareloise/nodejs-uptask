const Sequelize = require('sequelize');
const slug = require('slug');
const shortid = require('shortid');
const db = require('../config/db');

// Entity create 
const Projects = db.define('proyectos', {
      id: {
         type: Sequelize.INTEGER(11),
         primaryKey: true,
         autoIncrement: true
      },
      nombre: {
         type: Sequelize.STRING(100)
      },
      url:  {
         type: Sequelize.STRING(100)
      },
   },
   {
      // Triggers
      hooks: {
         beforeCreate(projects) {
            const url = slug(projects.nombre).toLowerCase();

            projects.url = `${url}-${shortid.generate()}`;
         },
      
   }
});

module.exports = Projects;