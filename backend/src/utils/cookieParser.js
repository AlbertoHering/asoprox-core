const cookieParser = require("cookie-parser");

exports.cookieParserInit = (cookieSecret) => {
  return cookieParser(cookieSecret);
};

exports.cookieConfig = {
  maxAge: 8 * 60 * 60 * 1000,
  httpOnly: true,
  signed: true,
};
