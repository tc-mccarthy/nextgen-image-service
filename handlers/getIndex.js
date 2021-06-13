const config = require("../config.js");
module.exports = (req, res, next) => {
  res.header("Cache-Control", "private, max-age=0, s-maxage=0");
  res.send("The service is running!");
};
