const CWebp = require('cwebp').CWebp,
	request = require("request"),
	config = require(__dirname + "/../config.js");


class Image {
	constructor(path) {
		this.path = path.replace(/\.webp$/, "");
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
			const encoder = new CWebp(this.buffer);

			encoder.quality(85).toBuffer((err, buffer) => {
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
