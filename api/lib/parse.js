'use strict';

var parse = require('parse').Parse;

if (!process.env.PARSE_APPID) {
  throw new Error('PARSE_APPID not set');
}

parse.initialize(
  process.env.PARSE_APPID,
  process.env.PARSE_JSKEY,
  process.env.PARSE_MASTERKEY
);

module.exports = {
  remind: function(reminder, done){

    var query = new parse.Query(parse.Installation);

    parse.Push.send({
      'push_time': reminder.push_time,
      where: query,
      data: reminder
    }, {
      success: function() {
        console.log('Sent reminder', reminder);
        return done && done();
      },
      error: function(err) {
        console.log('Error sending reminder', reminder, err);
        return done && done(err);
      }
    });
  },
  broadcast: function(data, done) {

    var query = new parse.Query(parse.Installation);

    parse.Push.send({
      where: query,
      data: data
    }, {
      success: function() {
        console.log('Sent broadcast', data);
        return done && done();
      },
      error: function(err) {
        console.log('Error sending broadcast', data, err);
        return done && done(err);
      }
    });
  }
};