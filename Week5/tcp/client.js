var net = require('net');
var client;

//Connectie maken met de client.
var connect = (function connect() {
    client = net.connect(1337, 'localhost');
})();

//Opvangen van data.
client.on('data', function(data) {
   console.log(data.toString('utf8'));
});

//Wanneer de client de connectie sluit.
client.on('close', function() {
    console.log('Einde van de connectie.');
});

//Wachten op input van de client.
process.stdin.on('data', function(data) {
    if(data.toString().toLowerCase().trim() === 'quit') {
        client.close();
    }

    else {
        client.write(data);
    }
});