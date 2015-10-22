/**
 * Created by kristofcolpaert on 22/10/15.
 */

var net = require('net');
//1. aanmaken van de TCP server

var server = net.createServer({
    allowHalfOpen: false
},
    function(socket) {
        console.log('server heeft een nieuwe connectie');

        socket.setEncoding('utf8');
        socket.write('Dit is een custom boodschap voor de client');
        socket.on('data', function(data) {
            if(data) {
                console.log('ontvangen data:' + data);
            }
            return socket.end();
        });
        socket.on('end', function(data) {
           console.log('Goodbye. Client connectie is beëindigd.');
        });
    });

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