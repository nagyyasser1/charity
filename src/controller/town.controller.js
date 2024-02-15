const Town = require("../model/Town.model");
const STATUS_CODES = require("../utils/statusCodes");

const handleAddTown = async (req, res, next) => {
  try {
    if (!req.body.town) return res.status(STATUS_CODES.BAD_REQUEST);

    const new_town = await Town.create({ town: req.body.town });
    res.status(STATUS_CODES.SUCCESS).json({ town: new_town });
  } catch (error) {
    next(error);
  }
};
const handleGetAllTown = async (req, res, next) => {
  try {
    const towns = await Town.find({}).lean();
    if (towns.length <= 0) {
      return res
        .status(STATUS_CODES.SUCCESS)
        .json({ message: "not towns yet!." });
    }

    res.status(STATUS_CODES.SUCCESS).json({
      towns,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddTown,
  handleGetAllTown,
};
