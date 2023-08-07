const Dependent = require("../model/Dependent.model"); // Replace with the actual path to the Dependent model

const LinkDependentWithItsCase = async (req, res, next) => {
  // Assuming that 'caseId' is stored in the session
  const caseId = req.session.caseId; // Replace 'caseId' with the correct session key

  const depIds = req.body.Dependent;

  try {
    // Update all dependents with the provided IDs and set the 'caseId' field
    const updateResult = await Dependent.updateMany(
      { _id: { $in: depIds } },
      { $set: { caseId: caseId } },
      { upsert: true, session: req.session }
    );

    // Check the 'nModified' property in the updateResult to see how many documents were updated
    console.log(`${updateResult} documents updated successfully.`);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = LinkDependentWithItsCase;
