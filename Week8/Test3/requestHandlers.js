/**
 * Created by kristofcolpaert on 19/11/15.
 */
var fs = require('fs');
var path = require('path');

var localMaps = {
    'html' : '/public/html/'
};

var root = function(req, res) {
    getFile('index.html', res);
};

var apiData = function(req, res) {

};

var getFile = function(request, response, callback) {
    var extension = path.extname(request.uri);
    var fileBase = path.basename(request.uri, extension);
    var localPath = path.resolve(process.cwd() + localMaps[extension] + fileBase + '.' + extension);

    fs.stat(localPath, function(error, stats) {
        if(!error) {
            fs.readFile(localPath, function(error, content) {
                if(!error) {
                    callback(null, content);
                }

                else {
                    callback(error, null);
                }
            });
        }

        else {
            callback(error, null);
        }
    });
};

exports.root = root;
exports.apiData = apiData;
exports.getFile = getFile;