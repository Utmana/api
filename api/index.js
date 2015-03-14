'use strict';

var express = require('express');
var routes = require('./routes');
var cors = require('express-cors');
var app = express();

app.use(cors({
  allowedOrigins: [
    '*'
  ]
}));

routes.register(app);

app.listen(process.env.PORT || 3000, console.log);

