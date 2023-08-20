const Dependent = require("../../model/Dependent.model"); // Replace with the actual path to the Dependent model

const LinkDependentWithItsCase = async (req, res, next) => {
  const caseId = req.caseId;
  const depIds = req.body.dependents;

  try {
    const updateResult = await Dependent.updateMany(
      { _id: { $in: depIds } },
      { $set: { caseId: caseId } },
      { upsert: true, session: req.session }
    );

    console.log(`${updateResult} documents updated successfully.`);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = LinkDependentWithItsCase;
