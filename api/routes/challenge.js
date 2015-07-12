'use strict';
var db = require('../lib/db').challenge;
var parse = require('../lib/parse');
var objectId = require('../lib/db').objectId;

module.exports = {
  list : function(req, res) {
    db.find({}).sort( { acceptedCount: -1 }, function(err, docs){
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
        'badge': 'Increment',
        'cid': doc._id, // extra data to send to the phone.
        'sound': 'cheering.caf' // default ios sound.
      };

      parse.broadcast(alert, function(err){
        if (err) { throw err; }
        res.json(doc);
      });
    });
  }, 
  delete : function(req, res) {
    db.remove({ _id : objectId(req.params.id) }, function(err){
      if (err) { throw err; }
      res.json(true);
    });
  }
};
