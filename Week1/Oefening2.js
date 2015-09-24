//Meerdere processen runnen ==> dan gaan we setTimeout runnen.
//setTimeout is een asynchrone functie.
setTimeout(function() { 
	console.log(process.argv[0]);
}, 10);

//Synchrone functie
//Alles wat niet asynchroon is, wordt in JavaScript eerst uitgevoerd.
console.log("Hello world");