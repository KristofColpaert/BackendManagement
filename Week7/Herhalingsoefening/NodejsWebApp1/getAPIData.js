/**
 * getAPIData.js
 * 
 * Haalt data op als node cliënt van een 
 * configureerbare API
 */

var getAPIData = (function () {
    var http = require("http");
    var EventEmitter = require('events').EventEmitter;    
    var emitter = new EventEmitter();
    
    var options = {
        method: 'GET',
        host: 'api.flickr.com',
        path: '/services/feeds/photos_public.gne?format=json&tags=NMCT&jsoncallback=?' + (new Date()).getTime() //gn caching
    }
    
    var callAPI = function (search, req, res) {
        // getAPIData = new EventEmitter();
        http.request(options, function (response) {            
            var json = "";
            
            response.on("data", function (chunck) {
                json += chunck;
            })
            
            response.on("end", function () {
                res.statusCode = 200;
                res.write(json);
                res.end();
            })
        
        }).end();  //end niet vergeten!
    }
    
    return {
        callAPI : callAPI ,
        options : options // wordt zo configureerbaar
    };
    
})();

module.exports = getAPIData;