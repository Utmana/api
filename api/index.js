'use strict';

var express = require('express');
var routes = require('./routes');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

routes.register(app);

app.listen(process.env.PORT || 3000, console.log);

