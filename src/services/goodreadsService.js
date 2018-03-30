var axios = require('axios');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({
  explicitArray: false
});

var goodreadsService = function () {

  var getBookById = function (id, cb) {

    /*   var options = {
      host: 'www.goodreads.com',
      path: '/book/show/656.xml?key=LuewpweRWkLib6jSClH9kA'
      // https://www.goodreads.com/book/show/50.xml?key=LuewpweRWkLib6jSClH9kA
    };

    var callback = function (response) {
      var str = '';

      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        parser.parseString(str,
          function (err, result) {
            console.log(result);
            cb(null, result.GoodreadsResponse.book);
          });
      });
    };
    http.request(options, callback).end();*/

    axios.get('https://www.goodreads.com/book/show/' + id + '.xml?key=LuewpweRWkLib6jSClH9kA')
      .then(function (response) {
        parser.parseString(response.data, function (err, result) {
          if (err) {
            console.log(err);
          } else {
            cb(null, result.GoodreadsResponse.book);
          }
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return {
    getBookById: getBookById
  };
};

module.exports = goodreadsService;