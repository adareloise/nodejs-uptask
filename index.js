const express = require('express');
const routes = require('./routes');
const path = require('path')


// Create app
const app = express();

// Habilitar pug
app.set('view engine', 'pug');

// Agregar vista
app.set('views', path.join(__dirname, './views'))

app.use('/', routes())



app.listen(3000);