var net = require('net');

var sockets = [];

var server = net.createServer(
    function(socket) {
        sockets.push(socket);
        socket.setEncoding('utf8');
        socket.write('Welkom op deze chatclient, ' + socket.remotePort.toString());

        socket.on('data', function(data) {
            if(data) {
                console.log(data.toString());

                sockets.forEach(function (currentSocket) {
                    if (currentSocket != socket) {
                        currentSocket.write(data);
                    }
                });
                //Socket niet afsluiten op server.
                //return socket.end();
            }
        });

        socket.on('end', function(data) {
            var index = sockets.indexOf(socket);
            console.log("Goodbye. Client connectie " + index + " is beëindigd.");
            sockets.splice(index, 1);
        });
    }
);

server.listen(1337, function() {
    console.log('luisteren naar poort' + server.address().port);
});

server.on('error', function(error) {
    if(error.code === 'EADDRINUSE') {
        console.log('Deze poort is reeds in gebruik');
    }
    else {
        console.log('Fout' + error.message);
    }
});