const { CustomError } = require("../middleware/errorHandler");
const Case = require("../model/Case.model");

const getCases = async (req, res, next) => {
  try {
    const cases = await Case.find({});
    res.status(200).json({
      message: "ok",
      cases,
    });
  } catch (error) {
    console.log("erro");
  }
};

const addCase = async (req, res, next) => {
  const newCase = new Case(req.body);
  try {
    await newCase.save();
    res.status(200).json(newCase);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCases,
  addCase,
};
