/*
 * Processes serieel of parallel afwerken
 * Serieel = met shift() ophalen en recursief uitvoeren
 * 
 */

//simulatie van willekeurige asynx task
function asyncTask(input, callback) {
    //na een variërende timeout wordt het resultaat aan de callback bezorgd
    var timeout = Math.round(Math.abs(Math.random() * 1000));
    console.log('doe iets met \'' + input + '\' en kom terug (timeout) na ' + timeout + ' msec.');
    setTimeout(function () { callback(input * 10); }, timeout);
}

//finale taak: toon delay van alle taken:
function final(result , delay) { console.log('Finaal: ', result , " na " + delay + " msec."); }

//Test data:
var inputs = [1, 2, 3, 4, 5];

//parallel (async)
var parallelResult = function () {
    var output = [];
    var start = new Date().getTime();
    inputs.forEach(function (item) {
        
        asyncTask(item, function (result) {
            output.push(result);
            if (output.length == inputs.length) {
                //returnt verwijderde waarde            
                final("parallel resultaat: " + output , new Date().getTime() - start);
                return series(inputs.shift()); 
            }
        })
    });
};




var series = function (item, start , output) {
    //zolang shift kan 
    var output = output?output: [];
    var start = start? start : new Date().getTime();
    if (item) {
        asyncTask(item, function (result) {
            //resultaat bijhouden
            output.push(result);
            // eerste item verwijderen  
            return series(inputs.shift(), start , output);
        });
    } else {
        return final("serieel resultaat: " + output , new Date().getTime() - start);       
    }
}

//series(inputs.shift());
parallelResult();




setTimeout(function () { process.exit() } , 45000)