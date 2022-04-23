const express = require('express');
const routes = require('./routes');
const path = require('path')
const bodyParser = require('body-parser');

// Create app
const app = express();

// Cargar archivos estaticos
app.use(express.static('public'));

// Habilitar pug
app.set('view engine', 'pug');

// Agregar vista
app.set('views', path.join(__dirname, './views'))

// habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}))

// habilitar rutas
app.use('/', routes())





app.listen(3000);