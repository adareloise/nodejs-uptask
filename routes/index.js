const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check');

//import  Controller
const projectsController =  require ('../controllers/projectsController');

// Rutas
module.exports = function(){

   // Home
   router.get('/', projectsController.projectHome);
   
   // Render new project
   router.get('/nuevo-proyecto', projectsController.projectForm);

   // create 
   router.post('/nuevo-proyecto', 
      body('nombre').not().isEmpty().trim().escape(),
      projectsController.projectNew);
   
   // update 
   router.post('/nuevo-proyecto/:id', 
      body('nombre').not().isEmpty().trim().escape(),
      projectsController.projectUpdate);

   // search unique url  
   router.get('/proyectos/:url', projectsController.projectUrl);

   // search by id 
   router.get('/proyectos/editar/:id', projectsController.projectFormEdit);

   // delete
   router.delete('/proyectos/:url', projectsController.projectDelete)

   return router;
}