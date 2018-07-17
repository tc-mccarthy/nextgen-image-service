const request = require("request"),
	async = require("async"),
	moment = require("moment"),
	util = require("util"),
	_ = require("lodash"),
	Image = require(__dirname + "/../lib/image.js"),
	models = require(__dirname + "/../models/index.js").models.autoLoad();

let app = {

	main: function (req, res, next) {
		res.render('index', {
			title: 'Express'
		});
	},

	jp2: function (req, res, next) {
		const image = new Image(req.originalUrl);

		image.get().then(() => {
			return image.toJP2();
		}).then((buffer) => {
			res.end(buffer, "binary");
		}).catch((err) => {
			console.log(err);
			res.send(JSON.stringify(err));
		});
	},

	jxr: function (req, res, next) {
		const image = new Image(req.originalUrl);

		image.get().then(() => {
			return image.toJXR();
		}).then((buffer) => {
			res.end(buffer, "binary");
		}).catch((err) => {
			console.log(err);
			res.send(JSON.stringify(err));
		});
	},

	webp: function (req, res, next) {
		const image = new Image(req.originalUrl);

		image.get().then(() => {
			return image.toWebP();
		}).then((buffer) => {
			res.end(buffer, "binary");
		}).catch((err) => {
			console.log(err);
			res.send(JSON.stringify(err));
		});
	}
};

exports.app = app;
