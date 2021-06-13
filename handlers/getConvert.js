const createError = require("http-errors");
const Image = require("../image.js");

module.exports = (req, res, next) => {
  const format = req.params["1"];
  let url = req.params["0"];

  if (!/\.(\w{3,4})$/.test(url)) {
    url += `.${format}`;
  }

  console.log(format);
  console.log(url);

  const image = new Image(`https://${url}`);
  image
    .convert(format)
    .then((imageBuffer) => {
      res.set(image.headers);
      res.status(200).end(imageBuffer, "binary");
    })
    .catch((e) => {
      next(createError(400, e.message, { ...e }));
    });
};
