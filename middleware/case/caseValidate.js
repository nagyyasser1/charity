const { caseDataValidationSchema } = require("../../utils/caseValidation");
const { CustomError } = require("../errorHandler");

function validateData(req, res, next) {
  const dataToValidate = { ...req.body };
  var { error } = caseDataValidationSchema.validate(dataToValidate, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new CustomError(400, error.details[0].message);
  } else {
    next();
  }
}

module.exports = {
  validateData,
};
