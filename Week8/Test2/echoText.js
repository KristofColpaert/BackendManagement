/**
 * Created by kristofcolpaert on 19/11/15.
 */

var echoText = function(someText) {
    'use strict';
    
    return function(req, res, next) {
        res.write('<p>' + someText + '</p>');
        res.end();
        next();
    }
};

module.exports = echoText;