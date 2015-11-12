/*
 * 
 * 
 * Module : Static server
 * 
 */

"use strict";

var staticServer = (function () {
    //variabelen en externe of node modules   
    var http = require("http"),
        fs = require("fs"),
        path = require("path"),
        url = require("url"),
        extensions = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "application/javascript",
            ".mp4": "video/mp4",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".ico": "image/x-icon"
        },
        localMaps = {
            ".html": "/public/",
            ".css": "/public/css/",
            ".js": "/public/javascript/",
            ".mp4": "/public/video/mp4/",
            ".png": "/public/images/",
            ".jpg": "/public/images/",
            ".gif": "/public/images/",  
            ".ico": "/public/images/"
        }
    
    
    //private functies
    /*-----  helper file        --------*/  
    var getFile = function (localPath, mimeType, res) {
        //opties invullen ( byte array)
        fs.readFile(localPath, null , function (err, contents) {
            if (!err) {
                res.writeHead(200, {
                    'Content-Type': mimeType ,
                    'Cache -Control': 'no-cache, no -store, must -revalidate',
                    'Pragma': 'no - cache',
                    'Expires': 0
                })
                res.write(contents);
            } else {
                if (err = "ENOENT") {
                    res.writeHead(404);
                    res.write("<html><head></head><body>File <b>" + localPath + "</b> niet gevonden.</body></html>")
                } else {
                    res.write("<html><head></head><body>Server fout.</body><html>")
                    res.writeHead(500);
                }
            }
            res.end();
        });
    }
    
    var httpListen = function (httpPort) {
        var server = http.createServer(function (req, res) {
            //ROUTER: Hier de URL  controleren (of het een API is, of een HTML file)   
            var uri = url.parse(req.url).pathname;
            console.log("uri: " , uri);
            switch (uri) {
                //case "/favicon.ico":
                //    var fileName = "favicon.ico";
                //    getFile(path.resolve("./public/images/" + filename) , extensions[".ico"], res)
                //    break;
                case "/apiData":
                    var apiOptions = {
                        method: "GET",           
                        port: 80,
                        host: 'api.flickr.com' ,
                        path: '/services/feeds/photos_public.gne?format=json&tags=NMCT&jsoncallback=?'
                    }
                    //API oproepen
                    var getAPIData = require("./getAPIData.js"),
                    qryParts = url.parse(req.url).query.split("="); //array
                    getAPIData.callAPI(qryParts[1], req, res);
                    
                    getAPIData.on('apiData', function (jsonItems) {
                        console.log(jsonItems);
                    });
                    
                    break;
                default:
                    var filename = path.basename(req.url) || "index.html",
                        ext = path.extname(filename),
                        localPath = process.cwd() + localMaps[ext] + filename;
                    
                    getFile(path.resolve(localPath) , extensions[ext], res);
            }
        });
        server.listen(httpPort);
    }
    
    //publieke functies
    var init = function (httpPort) {
        console.log("listening to port " , httpPort);
        httpListen(httpPort);

    };
    
    return {
        init: init
    }


})();

module.exports = staticServer;