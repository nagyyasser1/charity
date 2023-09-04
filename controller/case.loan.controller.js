const Case = require("../model/Case.model");
const CASE_TYPES = require("../utils/caseTypes");
const STATUS_CODES = require("../utils/statusCodes");

const handleAddLoanToCase = async (req, res, next) => {
  try {
    let { caseId } = req.params;
    let { case_data } = res.locals;

    if (!case_data?.caseType?.includes(CASE_TYPES.LOAN)) {
      case_data.caseType.push(CASE_TYPES.LOAN);
    }

    if (case_data?.loanInfo === undefined) {
      case_data.loanInfo = {
        items: [],
        totalPrice: 0,
      };
    }

    let { items } = case_data.loanInfo;

    const {
      approvalStatus,
      isUrgent,
      cost,
      description,
      researcher,
      startDate,
      endDate,
      numOfPaidMonths,
      slideCount,
      paid,
      finished,
      file,
    } = req.body;

    const newLoanItem = {
      approvalStatus,
      isUrgent,
      numOfPaidMonths,
      cost,
      description,
      researcher,
      startDate,
      endDate,
      slideCount,
      paid,
      finished,
      file,
    };

    items.push(newLoanItem);

    case_data.loanInfo.items = items;
    case_data.loanInfo.totalPrice += +req.body.cost;

    const updated_case = await Case.findByIdAndUpdate(caseId, case_data, {
      new: true,
    });

    res.status(STATUS_CODES.SUCCESS).json({
      message: "loan added to case",
      caseData: updated_case,
    });
  } catch (error) {
    next(error);
  }
};

const handleSelectLoanCases = async (req, res, next) => {
  try {
    const loan_cases = await Case.find({ caseType: { $in: ["loan"] } });
    // if (!loan_cases || loan_cases?.length <= 0)
    //   throw new CustomError(
    //     STATUS_CODES.NOT_FOUND,
    //     "there is no loan cases"
    //   );
    res.status(STATUS_CODES.SUCCESS).json({
      message: "success",
      loan_cases,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddLoanToCase,
  handleSelectLoanCases,
};
