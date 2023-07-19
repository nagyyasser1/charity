const { NotFoundError } = require("./errorHandler");

const notFound = (req, res, next) => {
  throw new NotFoundError(`Path Not Found For ${req.path}`);
};

module.exports = notFound;
