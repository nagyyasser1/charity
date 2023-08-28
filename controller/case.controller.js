const { CustomError } = require("../middleware/system/errorHandler");
const Case = require("../model/Case.model");
const buildQuery = require("../utils/buildQuery");

const {
  removeFileInUploadsLocal,
  removeFileFromCloudinary,
} = require("../utils/handleFileDelete");
const {
  handleFileUploadLocal,
  handleFileUploadOnCloudinary,
} = require("../utils/handleFileUpload");
const STATUS_CODES = require("../utils/statusCodes");

// @desc Create Mew Basic Case
// @route POST /case
// @access Private
const handleAddBasicCase = async (req, res, next) => {
  try {
    const { ssh, info } = req.body;
    const caseObj = { ssh, info, caseType: [] };

    // Create and store new case
    const new_case = await Case.create(caseObj);

    res
      .status(STATUS_CODES.CREATED)
      .json({ message: "saved.", caseData: new_case });
  } catch (error) {
    next(error);
  }
};

// @desc Get all cases
// @route Get /case
// @access Privite
const handleGetAllCases = async (req, res, next) => {
  const queryParameters = req.query;
  try {
    const query = buildQuery(queryParameters);

    const result = await Case.find(query).lean();

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ count: result.length, cases: result });
  } catch (err) {
    next(err);
  }
};

// @desc Get  case
// @route Get /case/:id
// @access Private
const handleGetCaseById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const caseData = await Case.findById(id).select("-__v").lean();
    if (!caseData)
      throw new CustomError(STATUS_CODES.NOT_FOUND, "id not Found!");
    res.status(200).json({ case: caseData });
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
  handleAddBasicCase,
  handleGetAllCases,
  handleGetCaseById,
  updateOneCase,
  deleteOneCase,
};
