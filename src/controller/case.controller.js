const { CustomError } = require("../middleware/system/errorHandler");
const Case = require("../model/Case.model");
const buildQuery = require("../utils/buildQuery");

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
  try {
    const result = await Case.find(req.query);

    if (!result) throw new CustomError(STATUS_CODES.NOT_FOUND, "not found");

    res.status(STATUS_CODES.SUCCESS).send(result);
  } catch (err) {
    next(err);
  }
};

const getCasesBySearch = async (req, res) => {
  const { nameQuery } = req.query; // Destructure the 'nameQuery' from req.query.

  try {
    const nameRegex = new RegExp(nameQuery, "i");

    const cases = await Case.find({ "info.name": nameRegex });

    res.status(STATUS_CODES.SUCCESS).json({ count: cases.length, cases });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

const handleDeleteAllCases = async (req, res, next) => {
  try {
    await Case.deleteMany({});
    res.status(STATUS_CODES.SUCCESS);
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
  handleDeleteAllCases,
  getCasesBySearch,
};
