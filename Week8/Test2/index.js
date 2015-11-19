var connect = require('connect');
var http = require('http');
var writeHead = require('./writeHead.js');
var saveRequest = require('./saveRequest.js');
var echoText = require('./echoText.js');

var app = connect();

app.use(saveRequest());
app.use(writeHead('text/html'));
app.use(echoText('Blabla blumblum'));

var server = http.createServer(app).listen(8080);