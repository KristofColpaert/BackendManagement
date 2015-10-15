var Loader = require('./022-ctorLoader.js');
var async = require('./bower_components/async/lib/async.js');


var users = [];
var usersIds = ["P1", "P2", "P3", "P4", "ERROR", "P6", "P7", "P8", "P9"];

var loader = new Loader();

loader.emitter.on("addedUser", function(element) {
    console.log("User added:", element);
});

loader.emitter.on("error", function(element) {
    console.log("Error.");
});


var parallelTask = function(cb) {
    loader.loadArrayAsync(users, usersIds, function (err, arr, duration) {
        if (err) {
            console.log(err);
        } else {
            console.log("ctor doorlooptijd bedraagt :", duration);
            return cb(null, "parallel ok");
        }
    });
};

var seriesTask = function(cb) {
    loader.loadSeries(users, usersIds, function (err, arr, duration) {
        if (err) {
            console.log(err);
        } else {
            console.log("ctor doorlooptijd bedraagt :", duration);
            return cb(null, "series ok");
        }
    });
};

async.series([parallelTask, seriesTask], function(err, result) {
    console.log("Following functions were executed: " + result);
});

setTimeout(function () { process.exit() }, 15000 );