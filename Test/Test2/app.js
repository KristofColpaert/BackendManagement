/**
 * Created by kristofcolpaert on 22/10/15.
 */

String.prototype.encrypt = (function () {
   var secret = {
       'p' : '\u0044',
       '1' : 'a'
   };
   return function(){
       var regex = /\w|\d|\s/gi;

       return this.replace(regex, function(a) {
          return typeof (secret[a.toLowerCase()]) !== "undefined" ? secret[a.toLowerCase()] : a;
       });
   }
})();

console.log('Een 1pekst'.encrypt());