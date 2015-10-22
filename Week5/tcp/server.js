var net = require('net');

//Hierin bewaren we alle sockets die connectie maken.
var sockets = [];

//Aanmaken van een server. Alle clients worden bewaard in sockets.
var server = net.createServer(
    function(socket) {
        sockets.push(socket);
        socket.setEncoding('utf8');
        socket.write('Welkom op deze chatserver ' + socket.remotePort.toString());

        socket.on('data', function(data) {
            console.log('Data ontvangen van socket ' + socket.remotePort.toString() + '.');

            sockets.forEach(function(socketInstance) {
                if(socketInstance !== socket) {
                    socketInstance.write(socket.remotePort.toString() + ' zegt: ' + data);
                }
            });
        });

        socket.on('end', function() {
            console.log('De verbinding met socket ' + socket.remotePort.toString() + ' wordt nu beëindigd.');
            var index = sockets.indexOf(socket);
            sockets.splice(index, 1);
        });
    }
);
server.listen(1337, 'localhost');