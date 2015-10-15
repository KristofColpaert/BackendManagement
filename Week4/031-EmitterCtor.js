/*
 * 
 * Constructor object UserEmitter wordt zelf een EventEmitter
 * (Alternatief: emitter als eigenschap van UserEmitter )
 * 
 */

var EventEmitter = require("events").EventEmitter;
//1. constructor object dat erft van EventEmitter
function UserEmitter() {
    //eigenschappen
    var self = this;
    //constructor van EventEmitter wordt opgeroepen en toegevoegd aan UserEmitter
    //call(thisArg[,arg1 [, arg2 ], … ]]]) 
    EventEmitter.call(self);
    
    //methodes (pas vanaf hier kan "emit")
    self.addUser = function (username, password) {
        //publish (=emit) het event.
        self.emit("userAdded", username, password);
    };
}

//2. prototype erving: UserEmitter erft van EventEmitter == overname van het prototype
//util.inherits(UserEmitter, EventEmitter);
UserEmitter.prototype = EventEmitter.prototype;


////foutieve schrijfwijze.  { } maakt nieuw prototype aan:
//UserEmitter.prototype = {
//    self : this,
//    say : function (iets) { console.log(iets); }
//}

////prototype aanvullen:
UserEmitter.prototype.self = this;
UserEmitter.prototype.say = function (iets) { console.log(iets); };
UserEmitter.prototype.getAddress = function () { return this._address?this._address:"Kortrijk";};
UserEmitter.prototype.setAddress = function (v) { this._address = v; };

/*-------------------------------------------------*/
var user = new UserEmitter();


//3. subscribe to the event (eerst intekenen in async omgeving)
user.on("userAdded", function (userName, pwd) {    
    console.log("User " + userName + " werd toegevoegd.");
});

//4. Methode oproepen (emit event als laatste)
user.addUser("Johan", "myPWD");
user.setAddress("Gent");
console.log("Adres: ", user.getAddress());

setTimeout(function () { process.exit(); } , 15000);