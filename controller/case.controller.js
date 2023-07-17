const Case = require("../model/Case.model");

const getAllCases = async (req, res, next) => {
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

module.exports = {
  getAllCases,
};
