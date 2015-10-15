/*
 * documentatie volgens http://usejsdoc.org/
 * Het module patroon
 * 
 * @author Johan V
 * @version 1.0.0
 *  * 
 */

(function () { "use strict"; })();
var Promise = require("./node_modules/es6-promises/promise.js");

var Loader = (function () {
    //private vars 
    var startTime = startTime? startTime: new Date().getTime();
    
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
                    cb(err, null);
                } else {
                    arrayA[counter] = element; //undefined
                    console.log(arrayA[counter]);
                    if (counter === elements.length) {
                        cb(null, arrayA , duration());
                    }
                }
            });
        }
    };

    var loadArrayPromise = function(output, inputs) {
        return new Promise(function(resolve, reject) {
            startTime = new Date().getTime();
            var counter = 0;

            var cbPromise = function(error, data) {
                counter++;

                if(error) {
                    reject(new Error(error));
                }

                else {
                    output.push(data);
                }

                if(counter == inputs.length) {
                    resolve(output);
                }
            };

            for(var element in inputs) {
                if(element) {
                    loadAsync(inputs[element], cbPromise);
                }
            }
        });
    };

    return {
        //public methods
        loadArrayAsync: loadArrayAsync,
        loadArrayPromise: loadArrayPromise
    };
})();

module.exports = Loader; 