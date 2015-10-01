var score = (function () {
    var counter = 0;
    var inner = function (bonus) {
        bonus = bonus === undefined? 0 : bonus;
        return (++counter + bonus);
    }
    return inner;
})(); // Zelf uitvoerende codes.

console.log(score());
console.log(score());
console.log(score(2));