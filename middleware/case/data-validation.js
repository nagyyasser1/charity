const CASE_TYPES = require("../../utils/caseTypes");
const {
  basicCaseDataSchema,
  monthlyCaseSchema,
  roofCaseSchema,
  loanCaseSchema,
  debtCaseSchema,
  treatmentCaseShema,
  furnitureCaseShema,
  operationCaseShema,
} = require("../../utils/data-validation-schema");
const STATUS_CODES = require("../../utils/statusCodes");
const { CustomError } = require("../system/errorHandler");

function returnCorrectSchema(type) {
  let target;
  switch (type) {
    case CASE_TYPES.BASIC:
      target = basicCaseDataSchema;
      break;
    case CASE_TYPES.MONTHLY:
      target = monthlyCaseSchema;
      break;
    case CASE_TYPES.ROOF:
      target = roofCaseSchema;
      break;
    case CASE_TYPES.LOAN:
      target = loanCaseSchema;
      break;
    case CASE_TYPES.DEBT:
      target = debtCaseSchema;
      break;
    case CASE_TYPES.TREATMENT:
      target = treatmentCaseShema;
      break;
    case CASE_TYPES.FURNITURE:
      target = furnitureCaseShema;
      break;
    case CASE_TYPES.OPERATION:
      target = operationCaseShema;
      break;

    default:
      break;
  }
  return target;
}

function validate_case_data(type) {
  return function (req, res, next) {
    const dataToBeValidate = { ...req.body };

    var { error } = returnCorrectSchema(type).validate(dataToBeValidate, {
      allowUnknown: true,
      abortEarly: false,
    });

    if (error) {
      throw new CustomError(STATUS_CODES.BAD_REQUEST, error.details[0].message);
    } else {
      next();
    }
  };
}

// ===============================================

function validate_Basic_Case_Data(req, res, next) {
  const dataToBeValidate = { ...req.body };

  var { error } = basicCaseDataSchema.validate(dataToBeValidate, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new CustomError(STATUS_CODES.BAD_REQUEST, error.details[0].message);
  } else {
    next();
  }
}

function validate_Monthly_Case_Data(req, res, next) {
  const dataToBeValidate = { ...req.body };

  var { error } = monthlyCaseSchema.validate(dataToBeValidate, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new CustomError(STATUS_CODES.BAD_REQUEST, error.details[0].message);
  } else {
    next();
  }
}

function validate_Roof_Case_Data(req, res, next) {
  const dataToBeValidate = { ...req.body };

  var { error } = roofCaseSchema.validate(dataToBeValidate, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new CustomError(STATUS_CODES.BAD_REQUEST, error.details[0].message);
  } else {
    next();
  }
}

function validate_Loan_Case_Data(req, res, next) {
  const dataToBeValidate = { ...req.body };

  var { error } = loanCaseSchema.validate(dataToBeValidate, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new CustomError(STATUS_CODES.BAD_REQUEST, error.details[0].message);
  } else {
    next();
  }
}

function validate_Debt_Case_Data(req, res, next) {
  const dataToBeValidate = { ...req.body };

  var { error } = debtCaseSchema.validate(dataToBeValidate, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new CustomError(STATUS_CODES.BAD_REQUEST, error.details[0].message);
  } else {
    next();
  }
}

function validate_Treatment_Case_Data(req, res, next) {
  const dataToBeValidate = { ...req.body };

  var { error } = treatmentCaseShema.validate(dataToBeValidate, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new CustomError(STATUS_CODES.BAD_REQUEST, error.details[0].message);
  } else {
    next();
  }
}

function validate_Furniture_Case_Data(req, res, next) {
  const dataToBeValidate = { ...req.body };

  var { error } = furnitureCaseShema.validate(dataToBeValidate, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new CustomError(STATUS_CODES.BAD_REQUEST, error.details[0].message);
  } else {
    next();
  }
}

function validate_Operation_Case_Data(req, res, next) {
  const dataToBeValidate = { ...req.body };

  var { error } = operationCaseShema.validate(dataToBeValidate, {
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
  validate_case_data,
  validate_Basic_Case_Data,
  validate_Monthly_Case_Data,
  validate_Roof_Case_Data,
  validate_Loan_Case_Data,
  validate_Debt_Case_Data,
  validate_Treatment_Case_Data,
  validate_Furniture_Case_Data,
  validate_Operation_Case_Data,
};
