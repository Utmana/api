'use strict';
var userchallengeDb = require('../lib/db').userchallenge;
var challengeDb = require('../lib/db').challenge;
var objectId = require('../lib/db').objectId;
var parse = require('../lib/parse');
var moment = require('moment');

module.exports = {
  all : function(req, res) {
    userchallengeDb.find({'challenge._id': objectId(req.params.challengeId) }, function(err, docs){
      if (err) { return res.json(500, err); }
      res.json(docs);
    });
  },
  mine : function(req, res) {
    userchallengeDb.find({ userId: req.headers['x-user-id'] }, function(err, userchallenges){
      if (err) { return res.json(500, err); }
      res.json(userchallenges); 
    });
  },
  me : function(req, res) {
    userchallengeDb.findOne({ userId: req.headers['x-user-id'], 'challenge._id': objectId(req.params.challengeId) }, function(err, userchallenge){
      if (err) { return res.json(500, err); }
      if (!userchallenge) { return res.json(404, 'userchallenge not found'); }
      res.json(userchallenge); 
    });
  },
  finished : function(req, res){
    userchallengeDb.findOne({ userId: req.headers['x-user-id'], 'challenge._id': objectId(req.params.challengeId) }, function(err, userchallenge){
      if (err){ return res.json(500, err); }
      if (!req.headers['x-user-id']) { return res.status(500).json('x-user-id must be set in headers'); }
      if (!userchallenge) { return res.json(404, 'userchallenge not found'); }
      userchallenge.finished = new Date();
      userchallengeDb.save(userchallenge, function(err, doc){
        if (err){
          return res.json(500, err);
        }

        var finished = {
          'alert': 'Utmaning avklarad: ' + userchallenge.challenge.title,
          'cid': userchallenge.challenge._id,
          'ucid': doc._id,
          'sound': 'cheering.caf' // default ios sound.
        };

        parse.broadcast(finished, function(err){
          if (err){
            return res.json(500, err);
          }
          challengeDb.update({ _id: objectId(req.params.challengeId) }, { $inc: { 'finishedCount':1 } }, function(){
            res.json(doc);
          });
        });
      });
    });
  },
  accept : function(req, res) {
    var userchallenge = req.body || {};
    challengeDb.findOne({ _id: objectId(req.params.challengeId) }, function(err, challenge){
      if (err){ return res.json(500, err); }
      if (!req.headers['x-user-id']) { return res.status(500).json('x-user-id must be set in headers'); }
      if (!challenge) { return res.json(404, 'challenge not found'); }

      userchallenge.acceptDate = new Date();
      userchallenge.challenge = challenge;
      userchallenge.userId = req.headers['x-user-id'];

      userchallengeDb.save(userchallenge, function(err, doc){
        if (err){
          return res.json(500, err);
        }


        var reminder = {
          'alert': challenge.title,
          'push_time': new Date(moment().add(challenge.reminderMinutes || 1, 'm').valueOf()),
          'badge': 'Increment',
          'cid': challenge._id, // extra data to send to the phone.
          'ucid': doc._id, // extra data to send to the phone.
          'userId': userchallenge.userId,
          'sound': 'cheering.caf' // default ios sound.
        };

        parse.remind(reminder, function(err){
          if (err){
            return res.json(500, err);
          }
          challengeDb.update({ _id: objectId(req.params.challengeId) }, { $inc: { 'acceptedCount':1 } }, function(){
            res.json(doc);
          });
        });
      });
    });
  }
};
