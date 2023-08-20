const Dependent = require("../../model/Dependent.model");

const addDependent = async (req, res, next) => {
  // if no dep provided continue
  if (!Array.isArray(req.body.dependents)) return next();

  const dependentsToBeSaved = req.body.dependents;

  console.log("dependentsToBeSaved", dependentsToBeSaved);

  try {
    const savedDependentIDs = await Promise.all(
      dependentsToBeSaved.map(async (dep) => {
        try {
          const { _id } = await Dependent.create(dep, { session: req.session });
          return _id.toString();
        } catch (error) {
          console.error("Error creating dependent:", error);
          throw error; // Rethrow the error to be caught by the outer try-catch
        }
      })
    );

    console.log("savedDependentIDs", savedDependentIDs);
    req.body.dependents = savedDependentIDs;
    // return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = addDependent;
