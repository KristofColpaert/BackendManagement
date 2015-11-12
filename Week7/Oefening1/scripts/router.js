/*
 * router.js
 * 
 * 
 */

var path = require('path');
var localMaps = {
    ".html": "/public/",
    ".css": "/public/css/",
    ".js": "/public/javascript/",
    ".mp4": "/public/video/mp4/",
    ".png": "/public/images/",
    ".jpg": "/public/images/",
    ".gif": "/public/images/",
    ".ico": "/public/images/"
};

var getRoute = function (handlers, request , response, callback) {
    var basename = path.basename(request.url) || "index.html",
        ext = path.extname(basename),
        pathname = "/" + basename.split("?")[0];

    if(typeof localMaps[ext] !== "undefined") {
        handlers["/getFile"](basename, request, response, function(err, data, mimeType) {
            if(err) {
                callback(err, null, null);
            }

            else {
                callback(null, data, mimeType);
            }
        });
    }

    else if(typeof handlers[pathname] === "function") {
        handlers[pathname](request, response); //Aan te maken.
    }

    else {
        console.log("no error handler found");
        response.writeHead(404, {"Content-type" : "text/html" });
        response.write("404 file not found");
        response.end();

    }
};

module.exports.getRoute = getRoute;