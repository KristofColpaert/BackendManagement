var delay = 1000;

var arrayElements0 = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8);
var arrayElements1 = new Array();

function loadAsync(element, delay, callback) {
	setTimeout(function() {
		var start = new Date().getTime();
		callback("element " + element + " loaded");
	}, 1000);
}

function loadArrayAsync(array, elements, callback) {
	var start = new Date().getTime();
	var counter = 0;
	for(var element in elements) {
		array[element] = loadAsync(element, delay, function(returnValue) {
			console.log(returnValue);
			if(++counter === elements.length) {
				callback((new Date().getTime() - start) + "\n");
			}
		});
	}
	
}

loadArrayAsync(arrayElements1, arrayElements0, function(returnValue){
	console.log(returnValue);
});