const Sequelize = require('sequelize');
const slug = require('slug');
const shortid = require('shortid');
const db = require('../config/db');

// Entity create 
const Projects = db.define('proyectos', {
      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      nombre: {
         type: Sequelize.STRING
      },
      url:  {
         type: Sequelize.STRING
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