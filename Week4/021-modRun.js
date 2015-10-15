/*
 * Oproepen en runnen  van module Loader.js
 * 
 * 
 */ 

//vergeet het puntje NIET bij relatieve adressering!!!
var Loader = require("./021-modLoader.js");
var Promise = require("./node_modules/es6-promises/promise.js");
require("./023-extension.js");

var users = [];
var usersIds = ["P1", "P2", "P3", "P4", "ERROR", "P6", "P7", "P8", "P9"];

Loader.loadArrayPromise(users, usersIds)
    .then(function() {
        console.log(users);
        return users;
    }, function() {
        console.log("Error");
    })
    .then(function (arr) {
        console.log(JSON.stringify(arr));
    })
    .catch(function (error) {
        console.log(error);
    });

//Loader.loadArrayAsync(users, usersIds, function (err, arr, duration) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log("Doorlooptijd van de Loader module:" , duration);
//    }
//});


setTimeout(function () { process.exit(); } , 15000);