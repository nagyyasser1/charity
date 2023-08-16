const { CustomError } = require("../middleware/errorHandler");
const Case = require("../model/Case.model");
const buildQuery = require("../utils/buildQuery");
const { removeFileInUploadsLocal } = require("../utils/handleFileDelete");
const { handleFileUploadLocal } = require("../utils/handleFileUpload");
const STATUS_CODES = require("../utils/statusCodes");

const getCases = async (req, res, next) => {
  const queryParameters = req.query;
  console.log(queryParameters);
  try {
    const query = buildQuery(queryParameters);

    const result = await Case.find(query).populate("Dependent");

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ count: result.length, cases: result });
  } catch (err) {
    next(err);
  }
};

const queryCases = async (req, res, next) => {
  try {
  } catch (error) {}
};

const getCaseById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cas = await Case.findById(id)
      .populate(["Box", "Dependent"])
      .select("-__v");
    if (!cas) throw new CustomError(404, "id not Found!");
    res.status(200).json({ case: cas });
  } catch (error) {
    next(error);
  }
};

const addCase = async (req, res, next) => {
  try {
    if (req.files != undefined) {
      const filePath = handleFileUploadLocal(req.files.File);
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

const updateOneCase = async (req, res, next) => {
  try {
    const caseId = req.params.id;
    var dataToBeUpdate = req.body;
    const prevCase = await Case.findById(caseId);

    if (!prevCase)
      throw new CustomError(STATUS_CODES.NOT_FOUND, `${caseId}:not Found!`);

    if (req?.files?.File != undefined) {
      removeFileInUploadsLocal(prevCase.filePath);
      const filePath = handleFileUploadLocal(req.files.File);
      dataToBeUpdate = { ...req.body, filePath };
    }

    const updatedCase = await Case.findByIdAndUpdate(caseId, dataToBeUpdate, {
      new: true,
    });

    res.status(STATUS_CODES.SUCCESS).json(updatedCase);
  } catch (error) {
    next(error);
  }
};

const deleteOneCase = async (req, res, next) => {
  try {
    const caseId = req.params.id;
    const caseExist = await Case.findById(caseId);

    if (!caseExist)
      throw new CustomError(STATUS_CODES.NOT_FOUND, `${caseId}:not Found!`);

    await Case.findByIdAndRemove(caseId);
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: `${caseExist.FirstName} removed successfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCases,
  addCase,
  getCaseById,
  updateOneCase,
  deleteOneCase,
  queryCases,
};
