let fs = require('fs'); //Node module that knows how to work with reading and writing files

const FILE_NAME = './assets/pies.json';

let pieRepo = {
  get: function (resolve, reject) {
    //passing 2 callbacks (promise design pattern here)
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  },

  getById: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let pie = JSON.parse(data).find((e) => e.id == id);
        resolve(pie);
      }
    });
  },
};

module.exports = pieRepo;
