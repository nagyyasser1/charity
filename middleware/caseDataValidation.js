const { caseDataValidationSchema } = require("../utils/caseValidation");
const { CustomError } = require("./errorHandler");

function validateCaseData(req, res, next) {
  const dataToValidate = { ...req.body, ...req.files };
  var { error } = caseDataValidationSchema.validate(dataToValidate, {
    allowUnknown: true,
    abortEarly: false,
  });
  if (error) throw new CustomError(400, error.details[0].message);
  next();
}

module.exports = {
  validateCaseData,
};
