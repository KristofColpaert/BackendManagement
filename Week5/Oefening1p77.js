/**
 * Created by kristofcolpaert on 22/10/15.
 */

var Readable = require('stream').Readable;
var rs = Readable({ encoding : 'utf8' });
var fs = require('fs');
var path = require('path');

rs.push('Het alfabet: \n');

for(var i = 97, l = 'z'.charCodeAt(0); i <= l; i++) {
    rs.push(String.fromCharCode(i));

    if(i >= 'z'.charCodeAt(0)){
        rs.push(null);
    }
}

rs.on('data', function(data) {
    console.log(data);
});

rs.on('error', function() {

});

rs.pipe(process.stdout);

var writable = fs.createWriteStream(path.normalize('./data/alfabet.txt'));

//Niet: rs.pipe(iets.txt).
//rs.pipe(writable);

rs.pipe(writable).on('finish', function() {
   console.log('de file is aangemaakt');
});