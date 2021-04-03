// Bring in the express server and create application
let express = require('express');  //The require() function resolves libraries and modules in the Node search path(usually \node_modules)
let app = express(); //The express() function creates an Express application. Many other objects are created from thi application object.

// Use the express Router object
let router = express.Router();

// Create GET to return a list of all pies
router.get('/', function (req, res, next) {
  res.send("Hello world"); //"Hello World"
});

// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);  //all REST APIs in this server are called as follows http://localhost:5000/api/

// Create server to listen on port 5000
var server = app.listen(5000, function () {  // The listen() method listens for connections on the host and the port number.
  console.log('Node server is running on http://localhost:5000..');
});


 // package.json a aşağıdaki kodu ekledik. nodemon bunu monitor ediyor ve çalıştığını gösteriyor. Node yerine Node monitorü run et. Değişiklik olursa da dinamik olarak gösteriyor yani refresh yapıyor.
 //"start": "nodemon index.js",