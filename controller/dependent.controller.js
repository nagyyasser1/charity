const { CustomError } = require("../middleware/errorHandler");
const Dependent = require("../model/Dependent.model");

const getDependent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Dep = await Dependent.findById(id);
    if (!Dep) throw new CustomError(404, `Dep with id ${id} not found!`);
    res.status(200).send(Dep);
  } catch (error) {
    next(error);
  }
};

const getAllDeps = async (req, res, next) => {
  try {
    const deps = await Dependent.find({});
    res.status(200).json(deps);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDependent,
  getAllDeps,
};
