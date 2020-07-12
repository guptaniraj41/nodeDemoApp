const http = require('http');

var server = http.createServer(function(request, respone) {
  respone.end('Hello world..!!\n');
});

server.listen(3000, function() {
  console.log("Server is listening on port 3000");
});
