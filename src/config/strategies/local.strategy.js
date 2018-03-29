var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  mongodb = require('mongodb').MongoClient;

module.exports = function (app) {
  passport.use(new LocalStrategy({
      usernameField: 'userName',
      passwordField: 'password'
    },
    function (username, password, done) {
      var url = 'mongodb://localhost:27017';
      mongodb.connect(url, function (err, client) {
        var db = client.db('libraryApp');
        var collection = db.collection('users');
        collection.findOne({
          username: username
        }, function (err, results) {
          if (err) {
            done(err);
          }
          else if (!results) {
            done(null, false, {
              message: 'Unknown user: ' + username
            });
          }
          else if (results.password === password) {
            var user = results;
            done(null, user);
          } else {
            done(null, false, {
              message: 'Bad password'
            });
          }
        });
        client.close();
      });
    }));
};