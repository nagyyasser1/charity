const mongoose = require("mongoose");
const Box = require("../model/Box.model");
const { CustomError } = require("./errorHandler");
const STATUS_CODES = require("../utils/statusCodes");

const validBoxID = async (req, res, next) => {
  try {
    const stringId = req.body.box;
    const objectId = new mongoose.Types.ObjectId(stringId);
    req.body.box = objectId;
    const box = await Box.findById(req.body.box);
    if (!box)
      throw new CustomError(
        STATUS_CODES.NOT_FOUND,
        `id:${req.body.box} for box not found`
      );
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validBoxID;
