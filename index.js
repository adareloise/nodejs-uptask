const express = require('express');
const routes = require('./routes');
const path = require('path')
const bodyParser = require('body-parser');

// Helpers printer json  
const helpers = require('./helpers')

// Create conexion db
const db = require('./config/db');

// import models
require('./models/Projects');
require('./models/Tasks');

// Sincronized dbs
db.sync()
   .then(() => {
      console.log('Contectado al servidor')
   })
   .catch(error => {
      console.log(error)
   });

// Create app
const app = express();

// Load static folder
app.use(express.static('public'));

// Enable Pug view
app.set('view engine', 'pug');

// Add directory view
app.set('views', path.join(__dirname, './views'))

// Include vardump in app
app.use((req, res, next) => {
   res.locals.vardump = helpers.vardump;
   next();
});

// local date
app.use((req, res, next) => {
   const fecha = new Date();
   res.locals.year = fecha.getFullYear();
   next();
});

// Enable bodyParser for read data in forms 
app.use(bodyParser.urlencoded({extended: true}))

// Enable rutes
app.use('/', routes())

// Port config
app.listen(3000);