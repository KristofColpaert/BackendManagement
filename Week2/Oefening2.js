var checkMyScope = function(a, b) {
    counter = 0;
    var counter;

    //Hoisting: declaratie (dus var) gaat JavaScript automatisch bovenaan de functie schrijven.
    //In het eerste geval werkt dit perfect.
    //In het tweede geval is init gewoon gedeclareerd, maar niet geïnitialiseerd.
    console.log("Counter returnt hier ", counter++);

    console.log("En hier is de waarde van init: ", init);
    var init = 10;

    if(true) {
        var message = "Iets";
    }

    //If heeft hier geen aparte scope, deelt scope met functie.
    console.log(message);
}

checkMyScope();