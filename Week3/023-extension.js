/*
 * Extension (uitbreiding) op het object String
 * String.encrypt(string)
 * 
 * 
 */

String.prototype.encrypt = (function () {
    // The secret table. 
    // Mappen van een karakter naar een ander : secret["a"]
    var secret = {
        'p': '\u0044' ,
        '1': 'a' ,
        '3': ':)',
        '5': '\u00A5',
        '7': '\u00C6'
    };
    
    //closure vorming = methode returnen
    return function () {
        //1. RegExp haalt elk karakter op 
        var oRegExp = /\w|\d|\s/gi;
              
        //2. asynchroon met string.replace(searchvalue,newvalue) 
        return this.replace(oRegExp, function (a) { //this is String
            return typeof (secret[a.toLowerCase()]) !== "undefined" ? secret[a.toLowerCase()]: a;
        });
    };
})();