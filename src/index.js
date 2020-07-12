const http = require('http');
const url = require('url');

var server = http.createServer(function(request, respone) {
  var parsedUrl = url.parse(request.url, true);
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');
  respone.end('Hello world..!!\n');
  console.log('Request received on path: ' + trimmedPath);
});

server.listen(3000, function() {
  console.log("Server is listening on port 3000");
});
