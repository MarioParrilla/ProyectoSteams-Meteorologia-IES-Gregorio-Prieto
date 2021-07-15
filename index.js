const url = require('url');
const {Control} = require('./Control');
const express  = require("express");

const app = express();

const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//const IP = "192.168.30.55";
//const IP = "localhost";
//const PUERTO = "3030";
const controlador = new Control();

app.use('/static',express.static(path.join(__dirname,'public')))

//GENERAL
app.get('/index', function(req, resp){
    console.log('Recibiendo peticion: /index')
    controlador.recogerDatosMeteriologicosDiarios((temperaturaDiaria) => {
        controlador.recogerDatosPrecipitacionesDiarias((datosPrecipitacion) => {

            resp.render('index',{
                data1: temperaturaDiaria,
                data2:datosPrecipitacion
            })
        });
    })
});


app.get('/tablaDatosMeteorologicos', function(req, resp){
    console.log('Recibiendo peticion: /tablaDatosMeteorologicos')
    controlador.recogerDatosMeteriologicos((datosTodasMediciones) => {
        resp.render('tablaDatosMeteorologicos',{
            data1: datosTodasMediciones
        })
    })
});

app.get('/tablaDatosPrecipitaciones', function(req, resp){
    console.log('Recibiendo peticion: /tablaDatosPrecipitaciones')
    controlador.recogerDatosPrecipitaciones((datosPrecipitacion) => {
        resp.render('tablaDatosPrecipitaciones',{
            data1: datosPrecipitacion
        })
    })
});

//DATOS MENSUALES
app.get('/temperaturam', function(req, resp){
    console.log('Recibiendo peticion: /temperaturam')
    controlador.recogerDatosMeteriologicosMensuales((datosTodasMediciones) => {
        resp.render('temperaturasmensuales',{
            data1: datosTodasMediciones
        })
    })
});

app.get('/precipitacionesm', function(req, resp){
    console.log('Recibiendo peticion: /precipitacionesm')
    controlador.recogerDatosPrecipitacionesMensuales((datosPrecipitacion) => {
        resp.render('precipitacionesmensuales',{
            data1: datosPrecipitacion
        })
    })
});

app.get('/presionm', function(req, resp){
    console.log('Recibiendo peticion: /presionm')
    controlador.recogerDatosMeteriologicosMensuales((datosTodasMediciones) => {
        resp.render('presionesmensuales',{
            data1: datosTodasMediciones
        })
    })
});

app.get('/radiacionm', function(req, resp){
    console.log('Recibiendo peticion: /radiacionm')
    controlador.recogerDatosMeteriologicosMensuales((datosTodasMediciones) => {
        resp.render('radiacionesMensuales',{
            data1: datosTodasMediciones
        })
    })
});

app.get('/humedadm', function(req, resp){
    console.log('recibiendo peticion')
    controlador.recogerDatosMeteriologicosMensuales((datosTodasMediciones) => {
        resp.render('humedadesMensuales',{
            data1: datosTodasMediciones
        })
    })
});

//INFO PROYECTO
app.get('/about', function(req, resp){
    console.log('Recibiendo peticion: /about')
    resp.render('about');
});

app.get('/images', function(req, resp){
    console.log('Recibiendo peticion: /images')
    resp.render('images');
});

app.listen(3040)
