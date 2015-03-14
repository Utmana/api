'use strict';

var express = require('express');
var db = require('mongojs')(process.env.MONGO_URL || 'mongodb://mongodb/test');
var log = db.collection('log');
var app = express();

/**
 * Just save some data to mongodb for the fun of it
 */
app.get('/', function(req, res){

  log.save({date: new Date(), host: req.host });

  log.find(function(err, docs){
    if (err) { console.warn(err); }
    res.json(docs); 
  });
});

app.listen(process.env.PORT || 3000, console.log);

