(function() { "use strict"; })();

//Oproepen Oefening7.js
var newModule = require("./Oefening7.js");

var users = [];
var usersIds = ["P1", "P2", "P3", "P4", "ERROR", "P5", "P6", "P7", "P8", "P9"];

console.log(newModule.loadArrayAsync(users, usersIds, function(error, element) {
    if(error) {
        console.log(error);
    }

    else {
        console.log("Tijd bedraagt:" , new Date().getTime() - start);
    }
}));