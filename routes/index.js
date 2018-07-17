var express = require('express'),
	router = express.Router(),
	c = require(__dirname + "/../controllers/index.js").controllers;

/* GET home page. */
router.get('/', c.app.main);
router.get(/.*webp$/, c.app.webp);

module.exports = router;
