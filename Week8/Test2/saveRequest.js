/**
 * Created by kristofcolpaert on 19/11/15.
 */

var saveRequest = function() {
    'use strict';
    var fs = require('fs');

    return function(req, res, next) {
        console.log(req.headers);
        var requestLogString = req.url + ';' + req.headers['user-agent'] + ';' + req.method + ';\n';
        fs.appendFile('./logs/requestLog.txt', requestLogString, 'utf8', function(error) {
            if(error) {
                console.log(error);
            }
        });
        next();
    }
};

module.exports = saveRequest;