const CWebp = require('cwebp').CWebp,
	request = require("request"),
	config = require(__dirname + "/../config.js"),
	gm = require("gm"),
	imageMagick = gm.subClass({ imageMagick: true });


class Image {
	constructor(path) {
		this.path = path.replace(/\.(webp|jp2)$/, "");
	}

	get() {
		return new Promise((resolve, reject) => {
			request({
				uri: `${config.app.origin}${this.path}`,
				encoding: null,
				method: 'GET',
			}, (err, response, body) => {
				console.log("Request");
				if (err) {
					reject(err);
				} else {
					this.buffer = body;
					resolve();
				}
			});
		});
	}

	toWebP() {
		return new Promise((resolve, reject) => {
			const encoder = new imageMagick(this.buffer);

			encoder.quality(85).toBuffer("WEBP", (err, buffer) => {
				if (err) {
					reject(err);
				} else {
					resolve(buffer);
				}
			});
		});
	}

	toJP2() {
		return new Promise((resolve, reject) => {
			const encoder = new gm(this.buffer);

			encoder.quality(40).toBuffer("JP2", (err, buffer) => {
				if (err) {
					reject(err);
				} else {
					resolve(buffer);
				}
			});
		});
	}

	toJXR() {
		return new Promise((resolve, reject) => {
			const encoder = new imageMagick(this.buffer);

			encoder.quality(85).toBuffer("JXR", (err, buffer) => {
				if (err) {
					reject(err);
				} else {
					resolve(buffer);
				}
			});
		});
	}
}


module.exports = Image;
