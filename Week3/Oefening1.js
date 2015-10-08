var GetText = require("./Oefening1b.js");

var readData = new GetText("./data/data.txt");
readData.readFile(function(error, callback) {
    if(error) {
        console.log(error);
    }

    else {
        console.log(callback);
    }
});
