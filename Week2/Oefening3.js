var processData = function(x) {
    var init = 2;

    //Closure:
    function secretCalc(y) {
        console.log(x + 2 * y + (++init));
    }
    return secretCalc; //Geen arg
};


//Function scope wordt niet vernieuwd. Er wordt altijd bijgeteld.
var doeIets = processData(2);
console.log(doeIets);
doeIets(10);
doeIets(10);
doeIets(10);

//Function scope wordt vernieuwd, vandaar opnieuw 0.
processData(2)(10);
