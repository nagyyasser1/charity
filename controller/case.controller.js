const Case = require("../model/Case.model");
const handleFileUpload = require("../utils/handleFileUpload");

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
  try {
    if (req.files != undefined) {
      const filePath = handleFileUpload(req.files.File);
      const newCase = new Case({ ...req.body, filePath: filePath });
      await newCase.save();
      res.status(200).json(newCase);
    } else {
      const newCase = new Case(req.body);
      await newCase.save();
      res.status(200).json(newCase);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCases,
  addCase,
};
