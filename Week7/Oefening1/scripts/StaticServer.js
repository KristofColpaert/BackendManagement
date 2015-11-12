/*
 * 
 * 
 * Module : Static server
 * 
 */


var staticServer = (function () {
    "use strict";
    //variabelen en externe of node modules   
    var http = require("http"),
        fs = require("fs"),
        path = require("path"),
        url = require("url"),
        getAPIData = require("./getAPIData.js"),
        //router = require('./router.js'),
        counters = require('./counters.js');
    ////   , extensions = {
    ////        ".html": "text/html",
    ////        ".css": "text/css",
    ////        ".js": "application/javascript",
    ////        ".mp4": "video/mp4",
    ////        ".png": "image/png",
    ////        ".jpg": "image/jpeg",
    ////        ".ico": "image/x-icon"
    ////    },
    ////    localMaps = {
    ////        ".html": "/public/",
    ////        ".css": "/public/css/",
    ////        ".js": "/public/javascript/",
    ////        ".mp4": "/public/video/mp4/",
    ////        ".png": "/public/images/",
    ////        ".jpg": "/public/images/",
    ////        ".gif": "/public/images/",  
    ////        ".ico": "/public/images/"
    ////    }
    
    
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
                    res.write("<html><head></head><body>File <b>" + localPath + "</b> niet gevonden.</body></html>");
                } else {
                    res.writeHead(500);
                    res.write("<html><head></head><body>Server fout.</body><html>");
                }
            }
            res.end();
        });
    };
    
    var httpListen = function (router, handlers, httpPort) {
        var server = http.createServer(function (req, res) {
            var uri = url.parse(req.url);
            router.getRoute(uri, function (err, contents , mimeType) {
                if (err) {
                    if (err = "ENOENT") {
                        res.writeHead(404);
                        res.write("<html><head></head><body>File <b>" + uri.pathname + "</b> niet gevonden.</body></html>");
                    } else {
                        res.write("<html><head></head><body>Server fout.</body><html>");
                        res.writeHead(500);
                    }

                } else {
                    res.writeHead(200, {
                        'Content-Type': mimeType ,
                        'Cache -Control': 'no-cache, no -store, must -revalidate',
                        'Pragma': 'no - cache',
                        'Expires': 0
                    })
                    res.write(contents);
                };
                res.end();
            });



            ////ROUTER: Hier de URL  controleren (of het een API is, of een HTML file)   
            //var uri = url.parse(req.url).pathname;
            //console.log("uri: " , uri);
            //switch (uri) {
            //    case "/apiData":
            //        var getAPIData = require("./getAPIData.js"),
            //            qryParts = url.parse(req.url).query.split("="); //array  
                      
            //        var apiOptions = {
            //            method: "GET",           
            //            port: 80,
            //            host: 'api.flickr.com' ,
            //            path: '/services/feeds/photos_public.gne?format=json&tags='+ qryParts[1] +'&jsoncallback=?'
            //        };
            //        //API oproepen                    
            //        getAPIData.callAPI(qryParts[1], apiOptions, req, res); //options toevoegen
                    
            //        //ofwel een cb , ofwel een emitter.
            //        getAPIData.on('apiData', function (jsonItems) {
            //            // not a function (emitter) yet 
            //            console.log("emitted " , jsonItems.length , " items.");
            //        });
                    
            //        break;
            //    default:
            //        var filename = path.basename(req.url) || "index.html",
            //            ext = path.extname(filename),
            //            localPath = process.cwd() + localMaps[ext] + filename;
                    
            //        getFile(path.resolve(localPath) , extensions[ext], res);
            //}
        });
        server.listen(httpPort);
    };

    //eventlistener binnen http.listen ==> max.listeners = 10.
    getAPIData.on('apiData', function (res, jsonItems) {
        console.log("emitted " , jsonItems.length , " items.");
        console.log("requestCount:" + counters.requestCount());

        res.statusCode = 200;
        res.end(JSON.stringify(jsonItems));//stringified & cleaned
        //res.end();
    });
    
    //publieke functies
    var init = function (router, handlers, httpPort) {
        console.log("listening to port " , httpPort);
        httpListen(router, handlers, httpPort);

    };
    
    return {
        init: init
    };

})();

module.exports = staticServer;