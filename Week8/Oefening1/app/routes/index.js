var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/welkom', function(req, res, next) {
  res.send('Blabla blumblum');
});

module.exports = router;