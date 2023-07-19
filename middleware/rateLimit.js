const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // maximum number of requests allowed within the window
  message: "Too many requests from this IP, please try again later.",
});

module.exports = limiter;
