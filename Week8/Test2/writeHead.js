/**
 * Created by kristofcolpaert on 19/11/15.
 */

var writeHead = function(mimeType) {
    'use strict';
    return function(request, response, next) {
        response.writeHead(200,
            {
                'Content-Type' : mimeType,
                'Set-Cookie' : 'datum=' + (new Date()).toJSON()
            }
        );
        next();
    }
};

module.exports = writeHead;