/**
 * Created by kristofcolpaert on 19/11/15.
 */
var path = require('path');

var getRoute = function(handlers, request, response, callback) {
    var basename = path.basename(request.url) || 'index.html';
    var ext = path.extname(basename);
    var pathname = '/' + basename.split('?')[0];

    handlers[pathname](request, response, function(error, content) {
        if(error) {
            callback(error, null);
        }

        else {
            callback(null, content);
        }
    });
};

exports.getRoute = getRoute;