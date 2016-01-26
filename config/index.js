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
}
