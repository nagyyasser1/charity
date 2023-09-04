const Case = require("../model/Case.model");
const CASE_TYPES = require("../utils/caseTypes");
const STATUS_CODES = require("../utils/statusCodes");

const handleAddTreatment = async (req, res, next) => {
  try {
    let { caseId } = req.params;
    let { case_data } = res.locals;

    if (!case_data?.caseType?.includes(CASE_TYPES.TREATMENT)) {
      case_data.caseType.push(CASE_TYPES.TREATMENT);
    }

    if (case_data?.treatmentInfo === undefined) {
      case_data.treatmentInfo = {
        items: [],
        totalPrice: 0,
      };
    }

    let { items } = case_data.treatmentInfo;

    const {
      approvalStatus,
      isUrgent,
      name,
      price,
      researcher,
      startDate,
      description,
      finished,
      monthly,
    } = req.body;

    const newLoanItem = {
      approvalStatus,
      isUrgent,
      name,
      price,
      researcher,
      startDate,
      description,
      monthly,
      finished,
    };

    items.push(newLoanItem);

    case_data.treatmentInfo.items = items;
    case_data.treatmentInfo.totalPrice += +price;

    const updated_case = await Case.findByIdAndUpdate(caseId, case_data, {
      new: true,
    });

    res.status(STATUS_CODES.SUCCESS).json({
      message: "treatment added to case",
      caseData: updated_case,
    });
  } catch (error) {
    next(error);
  }
};

const handleSelectTreatmentCases = async (req, res, next) => {
  try {
    const treatment_cases = await Case.find({
      caseType: { $in: ["treatment"] },
    });
    // if (!monthly_cases || monthly_cases?.length <= 0)
    //   throw new CustomError(
    //     STATUS_CODES.NOT_FOUND,
    //     "there is no monthly cases"
    //   );
    res.status(STATUS_CODES.SUCCESS).json({
      message: "success",
      treatment_cases,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddTreatment,
  handleSelectTreatmentCases,
};
