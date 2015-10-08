var Loader = require('./022-ctorLoader.js');
var StringExtensions = require("./023-extension.js");


var users = [];
var usersIds = ["P1".encrypt(), "P2".encrypt(), "P3".encrypt(), "P4".encrypt(), "ERROR", "P6", "P7", "P8", "P9"];

var loader = new Loader();

loader.emitter.on("addedUser", function(element) {
    console.log("User added:", element);
});

loader.emitter.on("error", function(element) {
    console.log("Error.");
});

loader.loadArrayAsync(users, usersIds, function (err, arr, duration) {
    if (err) {
        console.log(err);
    } else { 
        console.log("ctor doorlooptijd bedraagt :", duration);   
    }
})

setTimeout(function () { process.exit() }, 15000 );