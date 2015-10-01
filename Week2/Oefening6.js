for(var i = 0; i < 10; i++) {
    (function secretCall(i) {
        setTimeout(function() {
            console.log(i);
        }, 0);
    })(i);
}