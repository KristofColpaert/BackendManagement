/**
 * getAPIData.js
 * 
 * Haalt data op als node cliënt van een 
 * configureerbare API
 */

var getAPIData = (function () {
    "use strict";
    var http = require("http"),
        EventEmitter = require('events').EventEmitter,
        emitter = new EventEmitter(),
        counters = require("./counters.js");
    //
    
    //private:
    var options = {};
    
    options = {
        //default options for development
        method: 'GET',
        host: 'api.flickr.com',
        path: '/services/feeds/photos_public.gne?format=json&tags=NMCT&jsoncallback=?' + (new Date()).getTime() //gn caching
    };
    
    var clean = function (json) {
        //json file opkuisen (unexpected tokens door jsonp) 
        json = json.substring(1, json.length - 1);
        json = json.replace(/\\\'/g, ''); // vervangen van \' " 
        return json;
    };
    
    //public       
    var on = function (evt, cb) {
        emitter.once(evt, cb); // indien on wordt max. event listeners overschreden
    };
    var callAPI = function (currentSearch, apiOptions) {
        //getAPIData = new EventEmitter();                 
        options.path = '/services/feeds/photos_public.gne?format=json&tags=' + currentSearch + '&jsoncallback=?' + (new Date()).getTime()
        
        http.request(options, function (response) {
            var json = "";
            counters.increaseCount(currentSearch);
            
            response.on("data", function (chunck) {
                json += chunck;
            });
            
            response.on("end", function () {
                
                //res.statusCode = 200;
                //res.write(JSON.stringify(clean(json)));//stringified & cleaned
                //res.end();
               
                emitter.emit("apiData" , clean(json)); //cleaned
            });
            
            //fout controle
            response.on('error', function (err) {
                console.log("error: " , err);

            });
            
            
            //getAPIData.on("apiData", function (data) {
            //    console.log(data);
            //})
        
        }).end();  //end niet vergeten!
    };
    
    return {
        on: on,  // want anders: on is not a function...
        callAPI : callAPI ,
        options : options // wordt zo configureerbaar
    };
    
})();

module.exports = getAPIData;


//testing emitter-------------------------
//getAPIData.on("apiData", function (data) {
//    console.log(data);
//});