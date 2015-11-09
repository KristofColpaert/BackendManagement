var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Ticker () {
    var self = this;

    EventEmitter.call(self);

    self.showTicks = function(interval, data) {
        setInterval(function() {
            self.emit('publicity', data);
        }, interval);
    };
};

util.inherits(Ticker, EventEmitter);

module.exports = Ticker;