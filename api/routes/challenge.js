'use strict';
var db = require('../lib/db').challenge;
var parse = require('../lib/parse');

module.exports = {
  list : function(req, res) {
    db.find(req.query.id ? { id: req } : {}, function(err, docs){
      if (err) { return res.json(500, err); }
      res.json(docs); 
    });
  },
  get : function(req, res) {
    db.find(req.query.id ? { id: req } : {}, function(err, docs){
      if (err) { return res.json(500, err); }
      res.json(docs); 
    });
  },
  post : function(req, res) {
    var challenge = req.body;
    console.log('challenge', challenge);
    db.save(challenge, function(err, doc){
      if (err){
        return res.json(500, err);
      }

      parse.push(null /* userid */, challenge.summary, function(err){
        if (err){
          return res.json(500, err);
        }
        res.json(doc);
      });
    });
  }, 
  delete : function(req, res) {
    db.remove({date: new Date(), host: req.host }, function(err){
      if (err){
        return res.json(500, err);
      }
      res.json(true);
    });
  }
};
