const http = require('http');
const url = require('url');

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
  // code to send response to user
  respone.end('Hello world..!!\n');
  // logging request related information
  console.log('Request received on path: ' + trimmedPath +
    ' with request type as: ' + requestType +
    ' having query string parameters: ', queryStringObject,
    ' and headers are: ', headers);
});

// Server listening on port 3000
server.listen(3000, function() {
  console.log("Server is listening on port 3000");
});
