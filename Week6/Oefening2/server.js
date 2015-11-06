var http = require('http');
var path = require('path');
var fs = require('fs');

var server = http.createServer();

server.on('request', function(req, res) {
    var file = path.normalize('./BigBuckBunny_320x180.mp4');

    res.writeHead(200, { 'Content-Type' : 'text/html, video/mp4' });

    var readStream = fs.createReadStream(file, {
        flags: 'r',
        encoding: null,
        fd: null,
        mode: 0666,
        bufferSize: 256 * 1024
    });

    readStream.on('data', function(chunck) {
        if(!res.write) {
            console.log("Wacht");
            readStream.pause();
        }

        else {
            console.log("Ik doe voort");
            res.write(chunck);
        }

    });

    res.on('drain', function() {
        return function() {
            readStream.resume();
        }
    });
});
server.listen(4000);

console.log('Server listens to port 4000');