const fetch = require('node-fetch');
const sharp = require('sharp');

class Image {
  buffer = false
  headers = {}

  constructor (url) {
    this.url = url;
  }

  get () {
    return new Promise((resolve, reject) => {
      if (this.buffer) {
        resolve(this.buffer);
      } else {
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

  async convert (format) {
    const imageBuffer = await this.get();
    return sharp(imageBuffer).toFormat(format).toBuffer();
  }

  webp () {
    return this.convert('webp');
  }
}

module.exports = Image;
