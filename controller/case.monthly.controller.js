const { CustomError } = require("../middleware/system/errorHandler");
const Case = require("../model/Case.model");
const CASE_TYPES = require("../utils/caseTypes");
const STATUS_CODES = require("../utils/statusCodes");

// @desc Assign Monthy Case
// @route POST /case/monthy
// @access Private
const handleAddMonthlyDataToCase = async (req, res, next) => {
  try {
    const { case_data } = res.locals;

    if (case_data?.caseType?.includes(CASE_TYPES.MONTHLY))
      throw new CustomError(
        STATUS_CODES.CONFLICT,
        "this case aready have Monthly program"
      );

    case_data.caseType.push(CASE_TYPES.MONTHLY);
    case_data.monthlyInfo = req.body;
    const updated_case = await case_data.save();

    res.status(STATUS_CODES.CREATED).json({
      message: "Case assigned to monthly successfully",
      caseData: updated_case,
    });
  } catch (error) {
    next(error);
  }
};

const handleSelectMonthlyCases = async (req, res, next) => {
  try {
    const monthly_cases = await Case.find({ caseType: { $in: ["monthly"] } });
    // if (!monthly_cases || monthly_cases?.length <= 0)
    //   throw new CustomError(
    //     STATUS_CODES.NOT_FOUND,
    //     "there is no monthly cases"
    //   );
    res.status(STATUS_CODES.SUCCESS).json({
      message: "success",
      monthly_cases,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateMonthlyCase = async (req, res, next) => {};

module.exports = {
  handleAddMonthlyDataToCase,
  handleSelectMonthlyCases,
  handleUpdateMonthlyCase,
};
