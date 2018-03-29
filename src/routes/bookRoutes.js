var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var router = function (nav) {

  bookRouter.route('/')
    .get(function (req, res) {
      var url = 'mongodb://localhost:27017';
      mongodb.connect(url, function (err, client) {
        var db = client.db('libraryApp');
        var collection = db.collection('Books');
        collection.find({}).toArray(function (err, results) {
          res.render('bookListView', {
            title: 'Books',
            nav: nav,
            books: results
          });
        });
        client.close();
      });
    });

  bookRouter.route('/:id')
    .get(function (req, res) {
      var id = new ObjectId(req.params.id);
      var url = 'mongodb://localhost:27017';
      mongodb.connect(url, function (err, client) {
        var db = client.db('libraryApp');
        var collection = db.collection('Books');
        collection.findOne({_id: id}, function (err, result) {
          res.render('bookView', {
            title: 'Book',
            nav: nav,
            book: result
          });
        });
        client.close();
      });
    });
  return bookRouter;
};
module.exports = router;