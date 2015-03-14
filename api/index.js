'use strict';

var express = require('express');
var routes = require('./routes');
var cors = require('cors');
var app = express();

app.use(cors());

routes.register(app);

app.listen(process.env.PORT || 3000, console.log);

