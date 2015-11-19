/**
 * Created by kristofcolpaert on 19/11/15.
 */
var requestHandlers = require('./requestHandlers.js');
var router = require('./router.js');
var staticServer = require('./staticServer.js');

var handlers = {
    '/' : requestHandlers.root,
    '/apidata' : requestHandlers.apiData,
    '/getFile' : requestHandlers.getFile
};