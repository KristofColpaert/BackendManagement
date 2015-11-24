function loadUser(req, res, next) {
    var user = req.user = users[req.params.name];
    if (!user) {
        res.send('Niet gevonden of onbestaande gebruiker', 404)
        next();
    } else {
        next();
    }
}

module.exports = loadUser;