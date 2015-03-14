'use strict';
var db = require('../lib/db').challenge;
var parse = require('../lib/parse');
var objectId = require('../lib/db').objectId;

module.exports = {
  list : function(req, res) {
    db.find({}, function(err, docs){
      if (err) { throw err; }
      res.json(docs); 
    });
  },
  get : function(req, res) {
    db.findOne({ _id: objectId(req.params.id) }, function(err, docs){
      if (err) { throw err; }
      res.json(docs); 
    });
  },
  post : function(req, res) {
    var challenge = req.body;
    db.save(challenge, function(err, doc){
      if (err) { throw err; }

      var alert = {
        'alert': challenge.summary,
        'badge': 2,
        'anotherObjectId': '', // extra data to send to the phone.
        'sound': 'cheering.caf' // default ios sound.
      };

      parse.push(null /* userid */, alert, function(err){
        if (err) { throw err; }
        res.json(doc);
      });
    });
  }, 
  delete : function(req, res) {
    db.remove({date: new Date(), host: req.host }, function(err){
      if (err) { throw err; }
      res.json(true);
    });
  }
};
