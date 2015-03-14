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
  push: function(user, message, done) {

    var query = new parse.Query(parse.Installation);
    var data = {
        'alert': message,
        'badge': 2,
        'anotherObjectId': '', // extra data to send to the phone.
        'sound': 'cheering.caf' // default ios sound.
      };

    if (user){
      query.equalTo('user', {
        'objectId': user.id,
        'className': '_User',
        '__type': 'Pointer'
      }); // me.
      // query.equalTo('deviceType', 'ios');
    }

    parse.Push.send({
      where: query,
      data: data
    }, {
      success: function() {
        return done && done();
      },
      error: function(err) {
        return done && done(err);
      }
    });
  }
};