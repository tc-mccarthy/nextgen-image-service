const createError = require("http-errors");
module.exports = (req, res, next) => {
  next(
    createError(
      400,
      "You must provide the path to the original image, followed by the image extension you wish to use",
      {
        message:
          "You must provide the path to the original image, followed by the image extension you wish to use",
        supported_formats: config.app.supported_formats,
      }
    )
  );
};
