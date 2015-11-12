var path = require('path');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var extensions = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".mp4": "video/mp4",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".ico": "image/x-icon"
};


//public
var root = function (req, res) {
    getFile( 'index.html' , res);
};

var apiData = function(req, res) {

};

var getFile = function (uri ,req, res, callback) {
    var filename = path.basename(fullUrl.pathname) || "index.html",
        ext = path.extname(filename),
        //localPath = process.cwd() + localMaps[ext] + filename,
        localPath = path.resolve(process.cwd() + filename);

    getFile(filename, function (err, data) {
        fs.stat(localPath, function(error, stat) {
            if(stats && stats.isFile) {
                fs.readFile(localPath, function(err, contents) {
                    if (err) {
                        callback(err, null) ;
                    }

                    else {
                        callback(null, contents , extensions[ext]);
                    }
                });
            }
        });
    });
};

var upload = function(req, res) {

};

exports.root = root;
exports.apiData = apiData;
exports.getFile = getFile;
exports.upload = upload;