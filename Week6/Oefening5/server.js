/**
 * Created by kristofcolpaert on 29/10/15.
 */

var server = (function() {
    //Private
    'use strict';
    var http = require('http');
    var fs = require('fs');
    var path = require('path');
    var url = require('url');

    var extensions = {
        '.html' : 'text/html',
        '.css' : 'text/css',
        '.js' : 'application/javascript',
        '.mp4' : 'video/mp4',
        '.png' : 'image/png'
    };

    var localMaps = {
        '.html' : '/public/',
        '.css' : '/public/css/',
        '.js' : '/public/js/',
        '.mp4' : '/public/video/',
        '.png' : '/public/images/'
    };

    var getFile = function (localPath, mimeType, res) {
        fs.readFile(localPath, function(error, data) {
            if(error) {
                res.writeHead(500);
                res.end();
            }

            else {
                res.writeHead(200, { 'Content-Type' : mimeType });
                res.end(data.toString());
            }
        });
    };

    var httpListen = function(port) {
        var server = http.createServer(function(req, res) {
            //Hier de URL API controleren
            var uri = url.parse(req.url).pathname;
            console.log('uri: ', uri);
            switch(uri) {
                case '/' :
                    localPath = process.cwd() + '/public/' + "index.html";
                    getFile(localPath , 'text/html', res);
                    break;
                case '/apidata':
                    var apiOptions = {
                        method : 'GET',
                        port : 80,
                        hots : 'api.flickr.com',
                        path : '/services/feeds/photos_public.gne?format=json&tags=NMCT&jsoncallback'
                    }
                    var getApiData = require('./getApiData.js');
                    getApiData.on('apiData', function(data) {

                    });

            }

            var fileName = path.basename(req.url) || 'index.html';
            var ext = path.extname(fileName);
            var localPath = process.cwd() + localMaps[ext] + fileName;

            getFile(localPath, extensions[ext], res);
        }).listen(port);
    };

    //Publiek
    var init = function(port) {
        httpListen(port);
    };

    return {
        init : init
    };
})();

module.exports = server;