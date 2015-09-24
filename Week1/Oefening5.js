var argument = process.argv[2];

if(argument === "--help") {
	console.log("No help file attached to this program.");
}

else if(argument === "--name") {
	var name = process.argv[3];
	console.log("Hello " + name);
}

else {
	var menu = "\n";
	menu += "\nHello, this is my menu program.";
	menu += "\nAvailable functions:";
	menu += "\n--help \t Shows the help file attached to this program.";
	menu += "\n--name {name} \t Sends a greeting to you."
	console.log(menu);
}