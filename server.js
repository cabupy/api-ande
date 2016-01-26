'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var request = require('request');

var config = require('./config');

var port = process.env.PORT || config.Port;
var ip = process.env.IP || config.IP;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors( config.optCors ));
app.use(morgan('dev'));

// Agragamos el header powered-by Vamyal S.A. en un middleware
app.set('x-powered-by', false);
app.use(function(req, res, next) {
    res.header('X-Powered-By', 'Vamyal S.A. <vamyal.com>');
    res.header('X-Hello-Human', 'Somos @vamyalsa, Escribinos a <contacto@vamyal.com>');
    next();
});

app.get('/', function(req, res){
  res.status(200).json({
    success: true,
    message: 'Vamyal S.A. 2016 ! -  API para la ANDE'
  });
});

app.post('/consulta', function(req, res){

  // controlamos los parametros que recibimos en el body
  if (typeof req.body.nis === 'undefined' ) {
      res.status(404).json({ error: 'Falta el parametro nis.' });
      res.end();
      return;
  }

  request.post({
    url: config.urlAnde,
    headers: { Origin: config.Origin },
    form: { name: req.body.nis }
  }, function(error, response, body){
    if(error) {
      console.log(error);
      res.status(500).json({ error: 'Error al buscar el nis.' });
    } else {
      if (response.statusCode === 200) {
        res.status(200).json({ html: body });
      } else {
        res.status(response.statusCode).end();
      }
    }
  });

});

// El resto de metodos y rutas
app.use('*', function(req, res, next){
  res.status(200).json({
    success: true,
    message: 'Vamyal S.A. 2016 ! -  API para la ANDE'
  });
  next();
});

// Arrancamos el Server Express
console.time('Arrancamos el server en');
var server = app.listen(port, ip, function() {
    console.log('API Ande - API en http://%s:%s', server.address().address, server.address().port);
    console.timeEnd('Arrancamos el server en');
});

exports = module.exports = app;
