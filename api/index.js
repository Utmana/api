'use strict';

var express = require('express');
var routes = require('./routes');
var cors = require('express-cors');
var app = express();
routes.register(app);

app.use(cors({
  allowedOrigins: [
    '*'
  ]
}));

app.listen(process.env.PORT || 3000, console.log);

