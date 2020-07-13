// Dependency
const fs = require('fs');
const path = require('path');

// Code to perform CRUD operations on file
var file = {};
// Code to set the base directory
file.baseDirectory = path.join(__dirname, "/../.data/");
// Code to create and write data to file
file.create = function(directoryName, fileName, data, callback) {
  var fullPath = createPath(file.baseDirectory, directoryName, fileName);
  fs.open(fullPath, 'wx', function(error, fileDescriptor) {
    if(!error && fileDescriptor) {
      var stringData = JSON.stringify(data);
      fs.writeFile(fileDescriptor, stringData, function(error) {
        if (error) {
          callback('ERROR: Cannot write data to file.');
        } else {
          fs.close(fileDescriptor, function(error) {
            if (error) {
              callback('ERROR: Cannot close file properly');
            } else {
              callback(false);
            }
          });
        }
      });
    } else {
      callback("ERROR: Cannot open file, it doesn't exists.");
    }
  });
};

// Code to read data from file
file.read = function(directoryName, fileName, callback) {
  var fullPath = createPath(file.baseDirectory, directoryName, fileName);
  fs.readFile(fullPath, 'utf8', function(error, data) {
    callback(error, data);
  });
};

// Code to update data in a file
file.update = function(directoryName, fileName, data, callback) {
  var fullPath = createPath(file.baseDirectory, directoryName, fileName);
  fs.open(fullPath, 'r+', function(error, fileDescriptor) {
    if (!error && fileDescriptor) {
      var stringData = JSON.stringify(data);
      fs.ftruncate(fileDescriptor, function(error) {
        if (error) {
          callback('ERROR: Cannot truncate file.');
        } else {
          fs.writeFile(fileDescriptor ,stringData, function(error) {
            if (error) {
              callback('ERROR: Cannot write data to file.')
            } else {
              fs.close(fileDescriptor, function(error) {
                if (error) {
                  callback('ERROR: Cannot close file properly');
                } else {
                  callback(false);
                }
              });
            }
          });
        }
      });
    } else {
      callback('ERROR: Cannot open file for updating, it may not exists.');
    }
  });
};

// Code to delete file
file.delete = function(directoryName, fileName, callback) {
  var fullPath = createPath(file.baseDirectory, directoryName, fileName);
  fs.unlink(fullPath, function(error) {
    if (error) {
      console.log('Cannot delete file.');
    } else {
      callback(false);
    }
  });
};

var createPath = function(baseDirectory, directoryName, fileName) {
  return baseDirectory + directoryName + '/' + fileName + '.json';
}

// Code to export this module
module.exports = file;
