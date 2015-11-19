var http = require('http');
var test1Module = require('./Test1Module.js');

var app = http.createServer(test1Module());
app.listen(8080);