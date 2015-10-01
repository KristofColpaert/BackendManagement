"use strict";

var users = [];
var usersIds = ["P1", "P2", "P3", "P4", "ERROR", "P5", "P6", "P7", "P8", "P9"];
var start;

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
    var counter = 0;

    /*for (var element in elements) {
        var sElement = elements[element];
        loadAsync(sElement, function (error, element) {
            if(error) {
                arrayA[counter] = element;
                cb(error, null);
            }

            else {
                arrayA[counter] = element;
                console.log(arrayA[counter]);
                if (++counter === usersIds.length) {
                    cb(null, arrayA);
                }
            }
        });
    }*/

    //Andere manier van schrijven.
    //Foreach returnt niet de index, maar wel element.
    elements.forEach(function(element, index) {
        loadAsync(element, function (error, element) {
            if(error) {
                arrayA[index] = element;
                cb(error, null);
            }

            else {
                arrayA[index] = element;
                console.log(arrayA[index]);
                if (index + 1 === usersIds.length) {
                    cb(null, arrayA);
                }
            }
        });
    });
};

loadArrayAsync(users, usersIds, function (error, arr) {
    var arr = "";

    if(error) {
        console.log(error);
    }

    else {
        console.log("Tijd bedraagt:" , new Date().getTime() - start);
    }
});
