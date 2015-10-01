var test = function () {
	counter = 0;
	var counter ; //hoisted = declaratie komt eerst (zonder initialisatie)
	console.log("counter returnt hier ", ++counter);
	console.log("en hier is de waarde van init: ", init);
	var init=10;
};

test();