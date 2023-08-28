const Case = require("../../model/Case.model");
const STATUS_CODES = require("../../utils/statusCodes");
const { CustomError } = require("../system/errorHandler");

const caseExist = async (req, res, next) => {
  try {
    const { caseId } = req.params;

    const existedCase = await Case.findById(caseId);

    if (existedCase === null)
      throw new CustomError(STATUS_CODES.NOT_FOUND, `${caseId},not found!`);

    res.locals.case_data = existedCase;
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = caseExist;
