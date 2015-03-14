'use strict';
var db = require('../lib/db').user;
var objectId = require('../lib/db').objectId;

module.exports = {
  list : function(req, res) {
    db.find(req.query.id ? { id: req } : {}, function(err, docs){
      if (err) { return res.json(500, err); }
      res.json(docs); 
    });
  },
  get : function(req, res) {
    db.findOne({ _id: objectId(req.params.id) }, function(err, docs){
      if (err) { return res.json(500, err); }
      res.json(docs); 
    });
  },
  post : function(req, res) {
    db.save({date: new Date(), host: req.host }, function(err, doc){
      if (err){
        return res.json(500, err);
      }
      res.json(doc);
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
