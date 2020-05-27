var express = require('express');
var router = express.Router();
var messages = require('../messages');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { messages });
});

module.exports = router;
