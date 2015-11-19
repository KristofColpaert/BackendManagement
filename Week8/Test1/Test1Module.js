/**
 * Created by kristofcolpaert on 19/11/15.
 */

var test1Module = function() {
    return function(req, res) {
        res.write('<h1>Welkom, welkom!</h1>');
        res.end('Ik maak nu een einde aan de pagina');
    }
};

module.exports = test1Module;