const fetch = require('node-fetch');
const sharp = require('sharp');
const config = require('./config.js');

class Image {
  buffer = false
  headers = {}

  constructor (url) {
    this.url = url;
    this.URL = new URL(url);
  }

  get () {
    return new Promise((resolve, reject) => {
      if (this.buffer) {
        resolve(this.buffer);
      } else {
        if (config.domains.indexOf(this.URL.host) === -1) {
          const e = new TypeError(`${this.URL.host} is not on the allowlist`);
          reject(e);
        }

        fetch(this.url, {
          headers: {
            'User-Agent': 'MDC Image Service 2.0'
          }
        }).then(r => {
          Object.assign(this.headers, { 'Cache-Control': r.headers.get('cache-control') });
          return r.arrayBuffer();
        }).then(ab => {
          this.buffer = Buffer.from(ab);
          resolve(this.buffer);
        }).catch(e => reject(e));
      }
    });
  }

  convert (format) {
    return new Promise(async (resolve, reject) => {
      this.get().then(imageBuffer => {
        return sharp(imageBuffer)
          .toFormat(format)
          .toBuffer();
      }).then(imageBuffer => resolve(imageBuffer))
        .catch(e => reject(e));
    });
  }

  webp () {
    return this.convert('webp');
  }
}

module.exports = Image;
