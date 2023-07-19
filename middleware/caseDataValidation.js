const {
  BaseCaseSchemaValidation,
  specialCaseShema,
  watingCaseShema,
  factoryCaseShema,
  notDeserveCaseShema,
} = require("../utils/validation");
const { CustomError } = require("./errorHandler");

function validateCaseData(req, res, next) {
  if (req.body.sponsor == "special") {
    var { error } = specialCaseShema.validate(req.body);
    if (error) throw new CustomError(400, error.details[0].message);
  } else if (req.body.sponsor == "factory") {
    var { error } = factoryCaseShema.validate(req.body);
    if (error) throw new CustomError(400, error.details[0].message);
  } else if (req.body.sponsor == "foundation") {
    switch (req.body.deserve) {
      case "wating":
        var { error } = watingCaseShema.validate(req.body);
        if (error) throw new CustomError(400, error.details[0].message);

        break;
      case "no":
        var { error } = notDeserveCaseShema.validate(req.body);
        if (error) throw new CustomError(400, error.details[0].message);
        break;
      default:
        var { error } = BaseCaseSchemaValidation.validate(req.body);
        if (error) throw new CustomError(400, error.details[0].message);
        break;
    }
  } else {
    throw new CustomError(400, "invalid credenials ,provide the sponsor");
  }
  next();
}

module.exports = {
  validateCaseData,
};
