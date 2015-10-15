var noble = require('noble');

noble.on('stateChange', function(state) {
    if (state === 'poweredOn'){
        console.log("hier");
        noble.startScanning();
    }

    else
        noble.stopScanning();
});

function calculateDistance(rssi) {

    var txPower = -59 //hard coded power value. Usually ranges between -59 to -65

    if (rssi == 0) {
        return -1.0;
    }

    var ratio = rssi*1.0/txPower;
    if (ratio < 1.0) {
        return Math.pow(ratio,10);
    }
    else {
        var distance =  (0.89976)*Math.pow(ratio,7.7095) + 0.111;
        return distance;
    }
}

noble.on('discover', function(peripheral) {
    console.log(peripheral.uuid);
    console.log(calculateDistance(peripheral.rssi));
});