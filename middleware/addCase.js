const { handleFileUploadOnCloudinary } = require("../utils/handleFileUpload");
const Case = require("../model/Case.model");
const { removeFileFromCloudinary } = require("../utils/handleFileDelete");
const mongoose = require("mongoose");

const saveCaseMDW = async (req, res, next) => {
  var result;
  try {
    if (req.files != undefined) {
      result = await handleFileUploadOnCloudinary(req.files.File);
      const newCase = new Case({ ...req.body, filePath: result.secure_url });
      await newCase.save({ session: req.session });
      req.session.caseId = newCase._id;
      next();
    } else {
      const stringId = req.body.Box;
      const objectId = new mongoose.Types.ObjectId(stringId);
      req.body.Box = objectId;
      const newCase = new Case(req.body);
      await newCase.save({ session: req.session });
      req.session.caseId = newCase._id;
      req.case = newCase;
      next();
    }
  } catch (error) {
    removeFileFromCloudinary(result?.public_id);
    next(error);
  }
};

module.exports = saveCaseMDW;
