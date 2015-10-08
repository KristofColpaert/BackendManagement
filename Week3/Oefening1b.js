var fs = require("fs");

var GetText = function(fileName) {
    function readFile(callback) {
        fs.readFile(fileName, "utf8", function(error, data){
            if(error) {
                callback(error, null);
            }

            else {
                var lines = data.split("\n");
                var counter = 1;
                lines.forEach(function(line) {
                    line = line.replace("\\n", "");
                    var returnValue = counter++ + ". " + line;
                    callback(null, returnValue);
                });
            }
        });
    }

    return {
        readFile : readFile
    };
};

module.exports = GetText;