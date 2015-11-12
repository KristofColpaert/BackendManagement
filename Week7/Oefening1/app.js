/*
 * start file van de applicatie
 * node als api cliënt gebruiken
 */

"use strict";
var requestHandlers = require("./scripts/requestHandlers.js"),
    router = require("./scripts/router.js"),
    staticServer = require("./scripts/StaticServer.js");

//Middleware ophalen
var handlers = {};
handlers["/"] = requestHandlers.root;
handlers["/getFile"] = requestHandlers.getFile;
handlers["/apiData"] = requestHandlers.apiData;
handlers["/upload"] = requestHandlers.upload;

//Initialiseren inclusief middleware as dependency.
staticServer.init(router, handlers, 8080);