const Case = require("../model/Case.model");
const CASE_TYPES = require("../utils/caseTypes");
const STATUS_CODES = require("../utils/statusCodes");

const handleAddOperation = async (req, res, next) => {
  try {
    const { caseId } = req.params;
    let { case_data } = res.locals;

    if (!case_data?.caseType?.includes(CASE_TYPES.OPERATION)) {
      case_data.caseType.push(CASE_TYPES.OPERATION);
    }

    if (case_data?.operationInfo === undefined) {
      case_data.operationInfo = {
        items: [],
        totalPrice: 0,
      };
    }

    let { items } = case_data.operationInfo;

    const {
      approvalStatus,
      isUrgent,
      doctorName,
      doctorPhone,
      doctorAddress,
      operationName,
      date,
      operationSuccess,
      description,
      operationCost,
      costFromFoundation,
      researcher,
      file,
    } = req.body;

    const newOperationItem = {
      approvalStatus,
      isUrgent,
      doctorName,
      doctorPhone,
      doctorAddress,
      operationName,
      date,
      operationSuccess,
      description,
      operationCost,
      costFromFoundation,
      researcher,
      file,
    };

    items.push(newOperationItem);

    case_data.operationInfo.items = items;
    case_data.operationInfo.totalPrice += +costFromFoundation;

    const updated_case = await Case.findByIdAndUpdate(caseId, case_data, {
      new: true,
    });

    res.status(STATUS_CODES.SUCCESS).json({
      message: "operation added to case",
      caseData: updated_case,
    });
  } catch (error) {
    next(error);
  }
};

const handleSelectOperationCases = async (req, res, next) => {
  try {
    const operation_cases = await Case.find({
      caseType: { $in: ["operation"] },
    });
    // if (!monthly_cases || monthly_cases?.length <= 0)
    //   throw new CustomError(
    //     STATUS_CODES.NOT_FOUND,
    //     "there is no monthly cases"
    //   );
    res.status(STATUS_CODES.SUCCESS).json({
      message: "success",
      operation_cases,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddOperation,
  handleSelectOperationCases,
};
