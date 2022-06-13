const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check');

//import  Controllers
const projectsController =  require ('../controllers/projectsController');
const tasksController =  require ('../controllers/tasksController');

// Rutas
module.exports = function(){

   // Home
   router.get('/', projectsController.projectHome);
   
   /* Projects
      Render new project */
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

   router.get('/proyectos/editar/:id', projectsController.projectFormEdit);
   // search by id 

   // delete
   router.delete('/proyectos/:url', projectsController.projectDelete)

   /* Tasks
      Add Task */
   router.post('/proyectos/:url', tasksController.addTask)
   
   return router;
}