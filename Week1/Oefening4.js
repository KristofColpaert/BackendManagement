//Probleem: setTimeout geeft -1 terug.
//Reden: al het synchrone eerst uitgevoerd, index staat daarna op -1. Wanneer setTimeout wordt uitgevoerd, inderdaad index-1.
for(var argument in process.argv)
{
	console.log(process.argv[argument]);
	setTimeout(function () {console.log(i);}, O);
}
