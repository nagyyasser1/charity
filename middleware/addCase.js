const handleFileUpload = require("../utils/handleFileUpload");
const Case = require("../model/Case.model");
const saveCaseMDW = async (req, res, next) => {
  try {
    if (req.files != undefined) {
      const filePath = handleFileUpload(req.files.File);
      const newCase = new Case({ ...req.body, filePath: filePath });
      await newCase.save({ session: req.session });
      req.case = newCase;
      next();
    } else {
      const newCase = new Case(req.body);
      await newCase.save({ session: req.session });
      req.case = newCase;
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = saveCaseMDW;
