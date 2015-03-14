'use strict';

var express = require('express');
var routes = require('./routes');
var app = express();

routes.register(app);

app.listen(process.env.PORT || 3000, console.log);

