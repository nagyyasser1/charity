const {
  handleFileUploadOnCloudinary,
} = require("../../utils/handleFileUpload");
const Case = require("../../model/Case.model");
const { removeFileFromCloudinary } = require("../../utils/handleFileDelete");
const mongoose = require("mongoose");

const saveCaseMDW = async (req, res, next) => {
  var result;

  // convert string to objectId
  const stringId = req.body.box;
  const objectId = new mongoose.Types.ObjectId(stringId);
  req.body.box = objectId;

  try {
    if (req.files != undefined) {
      result = await handleFileUploadOnCloudinary(req.files.file);
      const newCase = new Case({ ...req.body, filePath: result.secure_url });
      await newCase.save({ session: req.session });
      req.caseId = newCase._id;
      next();
    } else {
      const newCase = new Case(req.body);
      await newCase.save({ session: req.session });
      req.caseId = newCase._id;
      req.case = newCase;
      next();
    }
  } catch (error) {
    removeFileFromCloudinary(result?.public_id);
    next(error);
  }
};

module.exports = saveCaseMDW;
