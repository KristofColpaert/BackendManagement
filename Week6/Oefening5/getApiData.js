/**
 * Created by kristofcolpaert on 29/10/15.
 */

var getApiData = (function() {
    var http = require('http');
    var EventEmitter = require('events').EventEmitter;

    var callApi = function(search, req, res) {
        http.request(options, function(response) {
            var json = "";
            response.on('data', function(data) {
                json += chunk;
            });

            response.on('end', function() {
                res.write(JSON.stringify(json));
                res.end();
            });
        });
        return {
            callApi : callApi,
            options: options
        }
    }
})();

module.exports = getApiData;