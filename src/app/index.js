const http = require('http');
const https = require('https');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const environment = require('./config');
const fs = require('fs');

// Instantiate HTTP server
var httpServer = http.createServer(function(request, response) {
  unifiedServer(request, response);
});

// Start HTTP server
httpServer.listen(environment.httpPort, function() {
  console.log("HTTP Server is listening on port " + environment.httpPort);
});

// Instantiate HTTPS Server
var httpsServerOptions = {
  "key": fs.readFileSync('/home/niraj/nodeDemoApp/src/app/https/key.pem'),
  "cert": fs.readFileSync('/home/niraj/nodeDemoApp/src/app/https/cert.pem')
};

var httpsServer = https.createServer(httpsServerOptions, function(request, response) {
  unifiedServer(request, response);
});

// Start HTTPS Server
httpsServer.listen(environment.httpsPort, function() {
  console.log("HTTPS Server is listening on port " + environment.httpsPort);
});

// common code for both HTTP and HTTPS Server
var unifiedServer = function(request, response) {
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
      // code to set response header
      response.setHeader('Content-Type', 'application/json');
      // code to set status code
      response.writeHead(statusCode);
      // code to send response data or payload
      response.end(payloadString);
      // logging request related information
      console.log('Returning response: ', payloadString);
    });
  });
};

// code to create handler to map user request
var handlers = {};

handlers.ping = function(data, callback) {
  callback(200);
};

handlers.notFound = function(data, callback) {
  callback(404);
};

// code to create a router to route user request
var router = {
  "ping": handlers.ping
}
