'use strict';

var user = require('./routes/user');
var team = require('./routes/team');
var challenge = require('./routes/challenge');
var userchallenge = require('./routes/userchallenge');

exports.register = function(app){

  /**
   * User 
   */
  app.get('/users', user.list);
  app.get('/users/:id', user.get);
  app.post('/users', user.post);
  app.delete('/users', user.delete);

  /**
   * team 
   */
  app.get('/teams', team.list);
  app.get('/teams/:id', team.get);
  app.post('/teams', team.post);
  app.delete('/teams', team.delete);

  /**
   * challenge 
   */
  app.get('/challenges', challenge.list);
  app.get('/challenges/:id', challenge.get);
  app.post('/challenges', challenge.post);
  app.post('/challenges/:challengeId/accept', userchallenge.post);
  app.delete('/challenges/:id', challenge.delete);

};