const Case = require("../model/Case.model");
const STATUS_CODES = require("../utils/statusCodes");
const { CustomError } = require("../middleware/system/errorHandler");

const handleAddRoofDataToCase = async (req, res, next) => {
  try {
    const { case_data } = res.locals;

    if (case_data?.caseType?.includes("roof"))
      throw new CustomError(
        STATUS_CODES.CONFLICT,
        "this case aready have roofReapir"
      );

    case_data.caseType.push("roof");
    case_data.roofInfo = req.body;
    const updated_case = await case_data.save();

    res.status(STATUS_CODES.CREATED).json({
      message: "Case assigned to roofRepair successfully",
      caseData: updated_case,
    });
  } catch (error) {
    next(error);
  }
};

const handleSelectRoofCases = async (req, res, next) => {
  try {
    const roof_cases = await Case.find({ caseType: { $in: ["roof"] } });
    // if (!monthly_cases || monthly_cases?.length <= 0)
    //   throw new CustomError(
    //     STATUS_CODES.NOT_FOUND,
    //     "there is no monthly cases"
    //   );
    res.status(STATUS_CODES.SUCCESS).json({
      message: "success",
      roof_cases,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddRoofDataToCase,
  handleSelectRoofCases,
};
