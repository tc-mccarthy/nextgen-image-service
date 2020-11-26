const express = require('express');
const app = express();
const config = require('./config.js');
const { port } = config.app;
const Image = require('./image.js');

app.get(/convert\/(.+)\.(\w{3,4})(?:\\?.+)?$/, (req, res) => {
  const format = req.params['1'];
  let url = req.params['0'];

  if (!/\.(\w{3,4})$/.test(url)) {
    url += `.${format}`;
  }

  console.log(format);
  console.log(url);

  const image = new Image(`https://${url}`);
  image.convert(format).then(imageBuffer => {
    res.set(image.headers);
    res.writeHead(200);
    res.end(imageBuffer, 'binary');
  }).catch(e => {
    res.writeHead(400, { 'Content-Type': 'application.json' });
    res.end(JSON.stringify({ success: false, ...e }));
  });
});

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: true, version: '1.0', message: 'This API will return nextgen versions of requested images from approved domains', supported_formats: config.app.supported_formats }));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
