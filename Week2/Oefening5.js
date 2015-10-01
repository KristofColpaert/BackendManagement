var Game = {};
Game.player = "Johan";

var score = (function (Game) {
    var counter = 0;
    var inner = function (bonus) {
        bonus = bonus === undefined? 0 : bonus;
        //Object literal
        return ({
            player : Game.player,
            points : ++counter + bonus
        });
    }
    return inner;
})(Game); // Entry point voor het argment.

console.log(score());
console.log(score());
console.log(score(2));