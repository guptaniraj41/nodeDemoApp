const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

// Create server
var server = http.createServer(function(request, respone) {
  // code to get the url requested by user
  var parsedUrl = url.parse(request.url, true);
  // code to extract the query string as object from url
  var queryStringObject = parsedUrl.query;
  // code to identify the http request type [GET, PUT, POST, DELETE] etc.
  var requestType = request.method;
  // code to extract the path from the url
  var path = parsedUrl.pathname;
  // code to replace the leading and trailing slash from path
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');
  // code to get the headers from the request
  var headers = request.headers;
  // code to get the payload
  var decoder = new stringDecoder('utf-8');
  var payload = '';
  request.on('data', function(data) {
    payload += decoder.write(data);
  });
  request.on('end', function() {
    payload += decoder.end();
    // code to choose handler where to send request
    var chossedHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
    // construct data object to send to the handler
    var data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': requestType,
      'headers': headers,
      'payload': payload
    }
    // route the request to handler
    chossedHandler(data, function(statusCode, reponsePayload) {
      // set status code if any otherwise set default status code
      statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
      // set reponsePayload if any otherwise set to empty object
      reponsePayload = typeof(reponsePayload) === 'object' ? reponsePayload : {};
      var payloadString = JSON.stringify(reponsePayload);
      // code to send response to user
      respone.writeHead(statusCode);
      respone.end(payloadString);
      // logging request related information
      console.log('Returning response: ', payloadString);
    });
  });
});

// Server listening on port 3000
server.listen(3000, function() {
  console.log("Server is listening on port 3000");
});

// code to create handler to map user request
var handlers = {};

handlers.testHandler = function(data, callback) {
  callback(200, {"name": data.trimmedPath + " called."})
};

handlers.notFound = function(data, callback) {
  callback(404);
};

// code to create a router to route user request
var router = {
  "test": handlers.testHandler
}
