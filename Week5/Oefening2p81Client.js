var net = require('net');

var nmbrRetries = 0;
var maxNmbrRetries = 3;
var retryTimeout = 5;

process.stdin.on('data', function(data) {
    if(data.toString().toLowerCase().trim() == 'quit') {
        client.end(data);
    }
    else {
        client.write(data);
    }
});

var connect = (function connect() {
    client = net.connect(1337, 'localhost', function() {
        console.log("Client maakt een connectie");
    });
})();

client.on('data', function(data) {
   console.log(data.toString('utf8'));
});

client.on('close', function() {
    console.log('Client connectie afgesloten. Er gebeurt een retry.');
    reconnect();
});

function reconnect() {
    if(nmbrRetries === maxNmbrRetries) {
        console.log("Maximum aantal retries bereikt.");
    }

    else {
        nmbrRetries += 1;
        setTimeout(connect, retryTimeout);
    }
}