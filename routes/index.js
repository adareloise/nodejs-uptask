const express = require('express');
const router = express.Router();

//import  Controller
const projectsController =  require ('../controllers/projectsController');

const {body} = require('express-validator/check');

module.exports = function(){

   // Rutas
   router.get('/', projectsController.projectHome);
   
   router.get('/nuevo-proyecto', projectsController.projectForm);

   router.post('/nuevo-proyecto', 
      body('nombre').not().isEmpty().trim().escape(),
      projectsController.ProjectNew);

   router.get('/proyectos/:url', projectsController.projectUrl);
   return router;
}