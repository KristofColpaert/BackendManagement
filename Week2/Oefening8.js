newModule = function(array, elements) {
    //Private variabelen
    var self = this;

    //Publieke eigenschappen voor initialisatie:
    this.array = array;
    this.elements = elements;
};

newModule.prototype = {
    //Instance properties:
    self : this,

    startTime : this.startTime? this.startTime : new Date().getTime(),

    loadAsync : function(element, cb) {
        if(element === "ERROR") {
            cb("ERROR", null);
        }

        else {
            setTimeout(function () { cb(null, element + " is loaded"); }, 1000);
        }
    },

    loadArrayAsync : function(array, elements, cb) {
        elements.forEach(function(element, index) {
            newModule.prototype.loadAsync(element, function (error, element) {

                if(error) {
                    array[index] = element;
                    cb(error, null);
                }

                else {
                    array[index] = element;
                    console.log(array[index]);
                    if (++index === elements.length) {
                        cb(null, array);
                    }
                }
            });
        });
    },

    duration : function() {
        return (new Date().getTime() - this.startTime);
    }
};

var users = [];
var usersIds = ["P1", "P2", "P3", "P4", "ERROR", "P5", "P6", "P7", "P8", "P9"];

var newObject = new newModule(users, usersIds);
newObject.loadArrayAsync(newObject.array, newObject.elements, function(error, element) {
    if(error) {
        console.log(error);
    }

    else {
        console.log("Tijd bedraagt:", newObject.duration());
    }
});