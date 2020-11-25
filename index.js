const express = require('express');
const app = express();
const config = require('./config.js');
const { port } = config.app;
const Image = require('./image.js');

app.get(/convert\/(.+)\.(jpg|webp)(?:\\?.+)?$/, (req, res) => {
  const format = req.params['1'];
  const url = req.params['0'];

  console.log(format);
  console.log(url);

  const image = new Image(`https://${url}`);
  image.convert(format).then(imageBuffer => {
    res.set(image.headers);
    res.writeHead(200, { 'Content-Type': `image/${format}` });
    res.end(imageBuffer, 'binary');
  }).catch(e => (resolve, reject) => {
    res.writeHead(400, { 'Content-Type': 'application.json' });
    res.end(JSON.stringify(e));
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
