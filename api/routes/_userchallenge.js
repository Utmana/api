'use strict';
var userchallengeDb = require('../lib/db').userchallenge;
var challengeDb = require('../lib/db').challenge;
var objectId = require('../lib/db').objectId;
var parse = require('../lib/parse');
var moment = require('moment');

module.exports = {
  list : function(req, res) {
    userchallengeDb.find(req.query.id ? { id: req } : {}, function(err, docs){
      if (err) { return res.json(500, err); }
      res.json(docs); 
    });
  },
  get : function(req, res) {
    userchallengeDb.find(req.query.id ? { id: req } : {}, function(err, docs){
      if (err) { return res.json(500, err); }
      res.json(docs); 
    });
  },
  post : function(req, res) {
    var userchallenge = req.body;
    challengeDb.findOne({ _id: objectId(req.params.challengeId) }, function(err, challenge){
      if (err){ return res.json(500, err); }
      if (!challenge) { return res.json(404, 'challenge not found'); }

      userchallengeDb.save(userchallenge, function(err, doc){
        if (err){
          return res.json(500, err);
        }

        userchallenge.challenge = challenge;

        var reminder = {
          'alert': challenge.summary,
          'push_time': new Date(moment().add(challenge.reminderMinutes || 1, 'm').valueOf()),
          'badge': 'Increment',
          'anotherObjectId': challenge._id, // extra data to send to the phone.
          'sound': 'cheering.caf' // default ios sound.
        };

        console.log(reminder);

        var user = req.headers.token ? {id: req.headers.token} : null;

        parse.push(user, reminder, function(err){
          if (err){
            return res.json(500, err);
          }
          res.json(doc);
        });
      });
    });
  }
};
