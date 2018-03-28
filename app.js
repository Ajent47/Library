var express = require('express');
var app = express();

var port = process.env.PORT || 5000;
var bookRouter = express.Router();

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

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

bookRouter.route('/')
  .get(function (req, res) {
    res.render('books', {
      title: 'Books',
      nav: [{
        Link: '/Books',
        Text: 'Books'
      }, {
        Link: '/Authors',
        Text: 'Authors'
      }],
      books: books
    });
  });

bookRouter.route('/single')
  .get(function (req, res) {
    res.send('Hello Single Book');
  });

app.use('/Books', bookRouter);

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Hello from render',
    nav: [{
      Link: '/Books',
      Text: 'Books'
    }, {
      Link: '/Authors',
      Text: 'Authors'
    }]
  });
});

app.get('/books', function (req, res) {
  res.send('Hello Books');
});

app.listen(port, function () {
  console.log('Running server on port ' + port); // eslint-disable-line no-console
});