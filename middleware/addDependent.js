const Dependent = require("../model/Dependent.model");

const addDependent = async (req, res, next) => {
  if (!req.body.Dependent) next();
  const dependentsToBeSaved = req.body.Dependent;
  const savedDependentIDs = [];
  try {
    for (const dep of dependentsToBeSaved) {
      const savedDep = await Dependent.create(dep);
      savedDependentIDs.push(savedDep._id.toString());
    }

    console.log("Saved object IDs:", savedDependentIDs);
    req.body.Dependent = savedDependentIDs;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = addDependent;
