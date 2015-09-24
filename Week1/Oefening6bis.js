function loadSync(element, delay) {
	var start = new Date().getTime();
	while (new Date().getTime() - start < delay) {
		//just wait
	}
	return "element " + element + " loaded" ;
}

//monitoren van synchrone doorlooptijd
function loadArraySynchroon(array, elements) {
	var start = new Date().getTime();
	for (var element in elements) {
		array[element] = loadSync(element, delay);
		console.log(array[element]); //informatie wanneer ingeladen
	}
	return (new Date().getTime() - start) + "\n";
}

var delay = 1000;

var arrayElements0 = new Array("Test0", "Test1", "Test2", "Test3", "Test4");
var arrayElements1 = new Array();

console.log(loadArraySynchroon(arrayElements1, arrayElements0));