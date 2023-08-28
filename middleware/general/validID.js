const mongoose = require("mongoose");
const { CustomError } = require("../system/errorHandler");
const STATUS_CODES = require("../../utils/statusCodes");

const validID = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new CustomError(STATUS_CODES.NOT_FOUND, "not valid id");
  next();
};

module.exports = validID;
