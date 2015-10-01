(function () { "use strict"; })();

var newModule = (function() {
    //Variabelen
    var startTime = startTime? startTime : new Date().getTime();
    var users = [];

    //Instantie variabelen
    var duration = function() {
        return (new Date().getTime() - startTime);
    };

    var loadAsync = function (element , cb) {
        if(element === "ERROR") {
            cb("ERROR", null);
        }
        else {
            setTimeout(function () { cb(null, element + " is loaded"); }, 1000);
        }
    };

    var loadArrayAsync = function (arrayA , elements, cb) {
        start = new Date().getTime();


    };

    //Return
    return {
        loadArrayAsync : loadArrayAsync,
        duration: duration
    };
})();

//Hiermee zorg je ervoor dat module ook extern kan opgeroepen worden.
module.exports = newModule;