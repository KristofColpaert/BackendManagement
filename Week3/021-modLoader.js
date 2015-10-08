/*
 * documentatie volgens http://usejsdoc.org/
 * Het module patroon
 * 
 * @author Johan V
 * @version 1.0.0
 *  * 
 */

(function () { "use strict"; })();

var EventEmitter = require("events").EventEmitter;

var Loader = (function () {
    //private vars 
    var startTime = startTime? startTime: new Date().getTime();
    var emitter = new EventEmitter();
    
    //private methods
    var duration = function () { return (new Date().getTime() - startTime); };
    
    var loadAsync = function (element , cb) {
        if (element === "ERROR") {
            cb("ERROR", null);
        } else {
            setTimeout(function () { cb(null, element + " is loaded"); }, 1000);
        }
    };
    
    var loadArrayAsync = function (arrayA , elements, cb) {
        startTime = new Date().getTime(); //reïnitialize 
        var counter = 0;
        
        for (var element in elements) {
            //element is een index bij for lus
            var sElement = elements[element];
            loadAsync(sElement, function (err, element) {
                counter++;
                if (err) {
                    arrayA[counter] = element;
                    emitter.emit("error", element);
                    cb(err, null);
                } else {
                    arrayA[counter] = element; //undefined
                    //console.log(arrayA[counter]);

                    emitter.emit("addedUser", element);
                    if (counter === elements.length) {
                        cb(null, arrayA , duration());
                    }
                }
            });
        }
    };
    return {
        //public methods
        loadArrayAsync: loadArrayAsync,
        emitter : emitter
    };
})();

module.exports = Loader; 