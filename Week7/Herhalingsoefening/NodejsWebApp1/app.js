/*
 * start file van de applicatie
 * 
 */


//1. applicatie webserver opstarten
var staticServer = require("./StaticServer.js");
staticServer.init(8080);

//2. node als api cliënt gebruiken
