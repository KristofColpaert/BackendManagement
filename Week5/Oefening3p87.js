var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer();

server.on('request', function(req, res) {
    res.writeHead(200, {
        'Content-Type' : 'text/plain'
    });

    res.end(req.url);
});

server.listen(1337);