var db = require('mongojs')(process.env.MONGO_URL || 'mongodb://mongodb/test');

module.exports = {
  team: db.collection('team'),
  user: db.collection('user'),
  challenge: db.collection('challenge'),
};
