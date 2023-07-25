const {
  handleFileUploadLocal,
  handleFileUploadOnCloudinary,
} = require("../utils/handleFileUpload");
const Case = require("../model/Case.model");
const { removeFileFromCloudinary } = require("../utils/handleFileDelete");

const saveCaseMDW = async (req, res, next) => {
  var result;
  try {
    if (req.files != undefined) {
      result = await handleFileUploadOnCloudinary(req.files.File);
      console.log("result from 12", result);
      // const filePath = handleFileUploadLocal(req.files.File);
      const newCase = new Case({ ...req.body, filePath: result.secure_url });
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
    removeFileFromCloudinary(result?.public_id);
    next(error);
  }
};

module.exports = saveCaseMDW;
