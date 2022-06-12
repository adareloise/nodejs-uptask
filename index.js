const express = require('express');
const routes = require('./routes');
const path = require('path')
const bodyParser = require('body-parser');

// Helpers con algunas funciones 
const helpers = require('./helpers')

// Create conexion db
const db = require('./config/db');

// import models
require('./models/Projects');

db.sync()
   .then(() => {
      console.log('Contectado al servidor')
   })
   .catch(error => {
      console.log(error)
   });

// Create app
const app = express();

// Cargar archivos estaticos
app.use(express.static('public'));

// Habilitar pug
app.set('view engine', 'pug');

// Agregar vista
app.set('views', path.join(__dirname, './views'))

// Pasar var dump a la app

app.use((req, res, next) => {
   res.locals.vardump = helpers.vardump;
   next();
});

// Fecha local
app.use((req, res, next) => {
   const fecha = new Date();
   res.locals.year = fecha.getFullYear();
   next();
});

// habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}))

// habilitar rutas
app.use('/', routes())

app.listen(3000);