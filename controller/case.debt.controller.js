const Case = require("../model/Case.model");
const CASE_TYPES = require("../utils/caseTypes");
const STATUS_CODES = require("../utils/statusCodes");

const handleAddDebt = async (req, res, next) => {
  try {
    const { caseId } = req.params;
    let { case_data } = res.locals;

    if (!case_data?.caseType?.includes(CASE_TYPES.DEBT)) {
      case_data.caseType.push(CASE_TYPES.DEBT);
    }

    if (case_data?.debtInfo === undefined) {
      case_data.debtInfo = {
        items: [],
        totalPrice: 0,
      };
    }

    let { items } = case_data.debtInfo;

    const {
      approvalStatus,
      isUrgent,
      debtAmount,
      paidAmount,
      restAmount,
      amountFromFoundation,
      description,
      startDate,
      endDate,
      finished,
      researcher,
      debtMan,
      debtManPhone,
      address,
      file,
    } = req.body;

    const newDebtItem = {
      approvalStatus,
      isUrgent,
      debtAmount,
      paidAmount,
      restAmount,
      amountFromFoundation,
      description,
      startDate,
      endDate,
      finished,
      researcher,
      debtMan,
      debtManPhone,
      address,
      file,
    };

    items.push(newDebtItem);

    case_data.debtInfo.items = items;
    case_data.debtInfo.totalPrice += +req.body.amountFromFoundation;

    const updated_case = await Case.findByIdAndUpdate(caseId, case_data, {
      new: true,
    });

    res.status(STATUS_CODES.SUCCESS).json({
      message: "debt added to case",
      caseData: updated_case,
    });
  } catch (error) {
    next(error);
  }
};

const handleSelectDebtCases = async (req, res, next) => {
  try {
    const debt_cases = await Case.find({ caseType: { $in: ["debt"] } });
    // if (!loan_cases || loan_cases?.length <= 0)
    //   throw new CustomError(
    //     STATUS_CODES.NOT_FOUND,
    //     "there is no loan cases"
    //   );
    res.status(STATUS_CODES.SUCCESS).json({
      message: "success",
      debt_cases,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddDebt,
  handleSelectDebtCases,
};
