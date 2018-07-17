var express = require('express'),
	router = express.Router(),
	c = require(__dirname + "/../controllers/index.js").controllers;

/* GET home page. */
router.get('/', c.app.main);
router.get(/.*webp$/, c.app.webp);
router.get(/.*jp2$/, c.app.jp2);
router.get(/.*jxr$/, c.app.jxr);

module.exports = router;
