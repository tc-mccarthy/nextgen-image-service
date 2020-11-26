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

  supported_format (format) {
    const { supported_formats } = config.app;

    return (Object.keys(supported_formats).indexOf(format) > -1);
  }

  get_mime_type (format) {
    const { supported_formats } = config.app;

    return supported_formats[format];
  }

  get () {
    const { domains } = config;
    return new Promise((resolve, reject) => {
      if (this.buffer) {
        resolve(this.buffer);
      } else {
        if (domains.indexOf(this.URL.host) === -1) {
          const e = new TypeError(`${this.URL.host} is not on the allowlist`);
          reject({ error: e.toString(), image: this });
        }

        fetch(this.url, {
          headers: {
            'User-Agent': 'MDC Image Service 2.0'
          }
        }).then(r => {
          const headers = r.headers.raw();
          const exclude_headers = ['content-type', 'etag'];
          const { status } = r;

          if (status < 200 || status > 399) {
            reject({ error: `Failed to fetch. ${status}`, image: this });
          }

          Object.keys(headers).forEach(h => {
            if (exclude_headers.indexOf(h) > -1) {
              Object.assign(this.headers, {
                [`${h.toLowerCase()}`]: r.headers.get(h)
              });
            }
          });

          return r.arrayBuffer();
        }).then(ab => {
          this.buffer = Buffer.from(ab);
          resolve(this.buffer);
        }).catch(e => reject({ error: e.toString() }));
      }
    });
  }

  convert (format) {
    const { supported_formats } = config.app;
    return new Promise(async (resolve, reject) => {
      if (!this.supported_format(format)) {
        const e = new TypeError(`${format} is not a supported image format`);
        reject({ error: e.toString(), image: this });
      }
      this.get().then(imageBuffer => {
        return sharp(imageBuffer)
          .toFormat(format)
          .toBuffer();
      }).then(imageBuffer => {
        Object.assign(this.headers, { 'content-type': this.get_mime_type(format) });
        resolve(imageBuffer);
      }).catch(e => reject({ error: e.toString(), image: this, ...e }));
    });
  }

  webp () {
    return this.convert('webp');
  }
}

module.exports = Image;
