'use strict';

var user = require('./routes/user');
var team = require('./routes/team');
var challenge = require('./routes/challenge');

exports.register = function(app){

  /**
   * User 
   */
  app.get('/users', user.list);
  app.get('/user/:id', user.get);
  app.post('/user', user.post);
  app.delete('/user', user.delete);



  /**
   * team 
   */
  app.get('/teams', team.list);
  app.get('/team/:id', team.get);
  app.post('/team', team.post);
  app.delete('/team', team.delete);


  /**
   * challenge 
   */
  app.get('/challenges', challenge.list);
  app.get('/challenge/:id', challenge.get);
  app.post('/challenge', challenge.post);
  app.delete('/challenge', challenge.delete);

};