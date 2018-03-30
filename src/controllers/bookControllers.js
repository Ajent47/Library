// revealing module patter

var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function (bookService, nav) {

  var middleware = function (req, res, next) {
    //  if (!req.user) {
    //    return res.redirect('/');
    //  }
    next();
  };

  var getIndex = function (req, res) {
    var url = 'mongodb://localhost:27017';
    mongodb.connect(url,
      function (err, client) {
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
  };

  var getById = function (req, res) {
    var id = new ObjectId(req.params.id);
    var url = 'mongodb://localhost:27017';
    mongodb.connect(url,
      function (err, client) {
        var db = client.db('libraryApp');
        var collection = db.collection('Books');
        collection.findOne({
          _id: id
        }, function (err, result) {
          bookService.getBookById(result.bookId,
            function (err, book) {
              result.book = book;
              res.render('bookView', {
                title: 'Book',
                nav: nav,
                book: result
              });
            });
        });
        client.close();
      });
  };

  return {
    getById: getById,
    getIndex: getIndex,
    middleware: middleware
  };
};

module.exports = bookController;