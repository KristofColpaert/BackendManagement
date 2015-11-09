var Ticker = require('./Ticker.js');
var test = new Ticker();

test.on('publicity', function(data) {
    console.log(data);
});

test.showTicks(1000, "Hallo");