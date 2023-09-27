const {
  productSchema,
  benefitSchema,
  dealSchema,
} = require("../../utils/data-validation-schema");

const { CustomError } = require("../system/errorHandler");
const STATUS_CODES = require("../../utils/statusCodes");

function validate_product_data(req, res, next) {
  const dataToBeValidate = { ...req.body };

  var { error } = productSchema.validate(dataToBeValidate, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new CustomError(STATUS_CODES.BAD_REQUEST, error.details[0].message);
  } else {
    next();
  }
}

function validate_benefit_data(req, res, next) {
  const dataToBeValidate = { ...req.body };

  var { error } = benefitSchema.validate(dataToBeValidate, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new CustomError(STATUS_CODES.BAD_REQUEST, error.details[0].message);
  } else {
    next();
  }
}

function validate_deal_data(req, res, next) {
  const dataToBeValidate = { ...req.body };

  var { error } = dealSchema.validate(dataToBeValidate, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new CustomError(STATUS_CODES.BAD_REQUEST, error.details[0].message);
  } else {
    next();
  }
}

module.exports = {
  validate_product_data,
  validate_benefit_data,
  validate_deal_data,
};
