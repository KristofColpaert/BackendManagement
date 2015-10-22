//Zal niet gewenste resultaat geven: for lus is al doorlopen wanneer timeouts worden uitgevoerd.
//for(var i = 0; i < 5; i++) {
//    setTimeout(function () {
//        console.log(i);
//    }, 20);
//}

//Geeft wel het gewenste resultaat, want ingebed in een outer function die de state bijhoudt.
var scoreFunction = (function score() {
    function inner(counter) {
        setTimeout(function() {
            console.log(counter);
        }, 20);
    }

    return inner;
})();

for(var i = 0; i < 5; i++) {
    scoreFunction(i);
}