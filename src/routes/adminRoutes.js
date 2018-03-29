var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [{
    'title': 'Pride and Prejudice',
    'genre': 'Fiction',
    'author': 'Jane Austen',
    'read': false
  },
  {
    'title': 'War and Peace',
    'genre': 'Fiction',
    'author': 'Leo Tolstoy',
    'read': false
  },
  {
    'title': 'Hamlet',
    'genre': 'Fiction',
    'author': 'William Shakespeare',
    'read': true
  },
  {
    'title': 'Moby Dick',
    'genre': 'Fiction',
    'author': 'Herman Melville',
    'read': true
  },
  {
    'title': 'The Great Gatsby',
    'genre': 'Fiction',
    'author': 'F. Scott Fitzgerald',
    'read': true
  },
  {
    'title': 'The Adventures of Huckleberry',
    'genre': 'Fiction',
    'author': 'Mark Twain',
    'read': true
  },
  {
    'title': 'Alice\'s Adventures in Wonderland',
    'genre': 'Fiction',
    'author': 'Lewis Carroll',
    'read': false
  }
];

var router = function (nav) {

  adminRouter.route('/addBooks')
    .get(function (req, res) {
      var url = 'mongodb://localhost:27017';
      mongodb.connect(url, function (err, client) {
        var db = client.db('libraryApp');
        var collection = db.collection('Books');
        collection.insertMany(books, function (err, results) {
          res.send(results);
        });
        client.close();
      });
    });
  return adminRouter;
};
module.exports = router;