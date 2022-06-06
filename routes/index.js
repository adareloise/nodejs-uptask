const express = require('express');
const router = express.Router();

//import  Controller
const projectsController =  require ('../controllers/projectsController');

const {body} = require('express-validator/check');

module.exports = function(){

   // Rutas
   router.get('/', projectsController.projectsHome);
   
   router.get('/nuevo-proyecto', projectsController.formularioProyecto);

   router.post('/nuevo-proyecto', 
      body('nombre').not().isEmpty().trim().escape(),
      projectsController.nuevoProyecto);

   return router;
}