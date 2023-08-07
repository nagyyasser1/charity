const { CustomError } = require("../middleware/errorHandler");
const Dependent = require("../model/Dependent.model");
const buildQuery = require("../utils/buildQuery");
const STATUS_CODES = require("../utils/statusCodes");

const getDependent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Dep = await Dependent.findById(id).populate("caseId");
    if (!Dep) throw new CustomError(404, `Dep with id ${id} not found!`);
    res.status(200).send(Dep);
  } catch (error) {
    next(error);
  }
};

const getAllDeps = async (req, res, next) => {
  const queryParameters = req.query;

  try {
    const query = buildQuery(queryParameters);

    const result = await Dependent.find(query);

    res.status(STATUS_CODES.SUCCESS).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDependent,
  getAllDeps,
};
