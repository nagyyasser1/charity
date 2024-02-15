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
      case_data.operationInfo = [];
    }

    let { operationInfo } = case_data;

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
      date: new Date(date),
      operationSuccess,
      description,
      operationCost,
      costFromFoundation,
      researcher,
      file,
    };

    operationInfo.push(newOperationItem);

    case_data.operationInfo = operationInfo;

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

const handleGetOperationStatistics = async (req, res, next) => {
  try {
    const queryDateStr = req.query.startDate;
    const comparisonOperator = req.query.comparisonOperator;

    if (!queryDateStr || !comparisonOperator) {
      return res
        .status(400)
        .send("Both startDate and comparisonOperator are required");
    }

    const queryDate = new Date(queryDateStr);

    let aggregationPipeline = [
      {
        $match: {
          caseType: "operation",
        },
      },
      {
        $unwind: "$operationInfo",
      },
    ];

    if (comparisonOperator === "gt") {
      aggregationPipeline.push({
        $match: {
          "operationInfo.date": { $gt: queryDate },
        },
      });
    } else if (comparisonOperator === "lt") {
      aggregationPipeline.push({
        $match: {
          "operationInfo.date": { $lt: queryDate },
        },
      });
    }

    aggregationPipeline.push({
      $group: {
        _id: null,
        countAllOperations: { $sum: 1 },
        countYesOperations: {
          $sum: {
            $cond: [{ $eq: ["$operationInfo.approvalStatus", "yes"] }, 1, 0],
          },
        },
        countNoOperations: {
          $sum: {
            $cond: [{ $eq: ["$operationInfo.approvalStatus", "no"] }, 1, 0],
          },
        },
        countWaitingOperations: {
          $sum: {
            $cond: [
              { $eq: ["$operationInfo.approvalStatus", "waiting"] },
              1,
              0,
            ],
          },
        },
        totalCostForYesFromFoundation: {
          $sum: {
            $cond: [
              { $eq: ["$operationInfo.approvalStatus", "yes"] },
              "$operationInfo.costFromFoundation",
              0,
            ],
          },
        },
      },
    });

    const statistics = await Case.aggregate(aggregationPipeline);

    res.status(200).json(statistics[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddOperation,
  handleSelectOperationCases,
  handleGetOperationStatistics,
};
