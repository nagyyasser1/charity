const mongoose = require("mongoose");

const startSessionMiddleware = async (req, res, next) => {
  try {
    req.session = await mongoose.startSession();
    req.session.startTransaction();
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = startSessionMiddleware;
