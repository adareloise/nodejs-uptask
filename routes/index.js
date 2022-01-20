const express = require('express');
const router = express.Router();

//import  Controller
const projectsController =  require ('../controllers/projectsController');

module.exports = function(){

   // Rutas
   router.get('/', projectsController.projectsHome);

   return router;
}