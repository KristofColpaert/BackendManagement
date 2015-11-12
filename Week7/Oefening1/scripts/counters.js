/*
 * 
 * counters (modulepatroon bewaart niet-persistente data) 
 * 
 */

var counters = (function (keyword) {
    //var EventEmitter = require('events').EventEmitter;
    // counters = new EventEmitter(); //informeer all clients indien hoger dan ...
    
    //private
    var counterRequests = 0;
    var counterKeywords = [];
    
    //public
    var increaseCount = function (keyword) { 
        if (counterKeywords[keyword]>0) {
            ++counterKeywords[keyword];
        } else {
            counterKeywords[keyword] = 1;
        };
        ++counterRequests;   
    };
    
    var getRequestCount = function () {
        console.log("request counter :" , counterRequests);
        return counterRequests;
    };
    
    var getKeywordCount = function (keyword) {
        console.log("keyword counter:" , counterKeywords);
        if (keyword) { 
            counterKeywords[keyword]
        }
        return counterKeywords;
    }
    
    return {
        increaseCount : increaseCount,
        keywordCount: getKeywordCount,
        requestCount: getRequestCount
    };
})();

module.exports = counters;