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

	webp: function (req, res, next) {
		const image = new Image(req.originalUrl);

		image.get().then(() => {
			console.log(image);
			return image.toWebP();
		}).then((buffer) => {
			// res.send(200);
			res.end(buffer, "binary");
		}).catch((err) => {
			res.send(err);
		});
	}
};

exports.app = app;
