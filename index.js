const express = require("express");
const app = express();
const config = require("./config.js");
let { port, path_prefix } = config.app;
const createError = require("http-errors");
const os = require("os");

const convertHandler = require("./handlers/getConvert.js");
const convertBaseHandler = require("./handlers/getConvertBase.js");
const indexHandler = require("./handlers/getIndex.js");

path_prefix = path_prefix[process.env.ENV];
console.log(path_prefix);
app.get(/convert\/(.+)\.(\w{3,4})(?:\\?.+)?$/, convertHandler);

app.get(`/`, indexHandler);
app.get(`/index.html`, indexHandler);
app.get(`${path_prefix}`, indexHandler);
app.get(`${path_prefix}index.html`, indexHandler);

app.use(function (req, res, next) {
  next(createError(404, "Page not found"));
});

// Handle Errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    ...err,
  });
});

app.listen(port, () => {
  console.log(`Image service listening at http://localhost:${port}`);
});
