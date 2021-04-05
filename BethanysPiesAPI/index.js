// Bring in the express server and create application
const {json} = require('express');
let express = require('express'); //The require() function resolves libraries and modules in the Node search path(usually \node_modules)
let app = express(); //The express() function creates an Express application. Many other objects are created from thi application object.

let pieRepo = require('./repos/pieRepo');

// Use the express Router object
let router = express.Router();

//let pies = pieRepo.get();  en basit kullanımı bu şekildeydi.

// Create GET to return a list of all pies
router.get('/', function (req, res, next) {
  // res.send('Hello world');
  pieRepo.get(
    function (data) {
      res.status(200).json({
        status: 200,
        statusText: 'OK',
        message: 'All pies retrieved.',
        data: data,
      });
    },
    function (err) {
      next(err);
    },
  );
});

// Create GET/search?id=n&name=str to search for pies by 'id' and/or 'name'
router.get('/search', function (req, res, next) {
    let searchObject = {
      "id": req.query.id,
      "name": req.query.name
    };
    
    pieRepo.search(searchObject, function (data) {
      res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "Search for pies successful.",
        "data": data
      });
    },
    function (err) {
      next(err);
    });
  });

//Create GET/id to return a single pie
router.get('/:id', function (req, res, next) {
  // res.send('Hello world');
  pieRepo.getById(
    req.params.id,
    function (data) {
      if (data) {
        res.status(200).json({
          status: 200,
          statusText: 'OK',
          message: 'Singe pie retrieved.',
          data: data,
        });
      } else {
        res.status(404).json({
          status: 200,
          statusText: 'Not Found',
          message: "The pie '" + req.params.id + "' could not be found.",
          error: {
            code: 'NOT_FOUND',
            message: "The pie '" + req.params.id + "' could not be found.",
          },
        });
      }
    },
    function (err) {
      next(err);
    },
  );
});

// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router); //all REST APIs in this server are called as follows http://localhost:5000/api/

// Create server to listen on port 5000
var server = app.listen(5000, function () {
  // The listen() method listens for connections on the host and the port number.
  console.log('Node server is running on http://localhost:5000..');
});

// package.json a aşağıdaki kodu ekledik. nodemon bunu monitor ediyor ve çalıştığını gösteriyor. Node yerine Node monitorü run et. Değişiklik olursa da dinamik olarak gösteriyor yani refresh yapıyor.
//"start": "nodemon index.js",
