'use strict';

module.exports = {
  optCors : {
    methods: ['HEAD','OPTIONS', 'POST'],
    credentials: true,
    maxAge: 3600,
    preflightContinue: false,
  },
  Port: 3120,
  IP: 'localhost',
  urlAnde: 'http://201.217.43.238:9080/consulta/consulta_02.php',
  Origin: 'http://201.217.43.238:9080',
}
