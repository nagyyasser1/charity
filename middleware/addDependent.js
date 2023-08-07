const Dependent = require("../model/Dependent.model");

const addDependent = async (req, res, next) => {
  if (!Array.isArray(req.body.Dependent)) {
    next();
  } else {
    const dependentsToBeSaved = req.body.Dependent;

    try {
      const savedDependentIDs = await Promise.all(
        dependentsToBeSaved.map(async (dep) => {
          const deptobesave = new Dependent(dep);
          await deptobesave.save({ session: req.session });
          return deptobesave._id.toString();
        })
      );
      req.body.Dependent = savedDependentIDs;
      next();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = addDependent;
