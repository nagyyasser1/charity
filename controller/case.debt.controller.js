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
      paidFromFoundation,
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
      paidFromFoundation,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
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
    // if (!debt_cases || debt_cases?.length <= 0)
    //   throw new CustomError(
    //     STATUS_CODES.NOT_FOUND,
    //     "there is no debt cases"
    //   );
    res.status(STATUS_CODES.SUCCESS).json({
      message: "success",
      debt_cases,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetDebtStatistics = async (req, res, next) => {
  try {
    const queryDateStr = req.query.startDate;
    const comparisonOperator = req.query.comparisonOperator;

    if (!queryDateStr || !comparisonOperator) {
      return res
        .status(400)
        .send("Both startDate and comparisonOperator are required");
    }

    const queryDate = new Date(queryDateStr);

    let currentAggregationPipeline = [
      {
        $match: {
          caseType: "debt",
          "debtInfo.items.approvalStatus": "yes",
          "debtInfo.items.finished": false,
        },
      },
      {
        $unwind: "$debtInfo.items",
      },
      {
        $match: {
          "debtInfo.items.approvalStatus": "yes",
          "debtInfo.items.finished": false,
        },
      },
    ];

    let finishedAggregationPipeline = [
      {
        $match: {
          caseType: "debt",
          "debtInfo.items.approvalStatus": "yes",
          "debtInfo.items.finished": true,
        },
      },
      {
        $unwind: "$debtInfo.items",
      },
      {
        $match: {
          "debtInfo.items.approvalStatus": "yes",
          "debtInfo.items.finished": true,
        },
      },
    ];

    const dateFilter = {
      gt: { $gt: queryDate },
      lt: { $lt: queryDate },
    };

    if (dateFilter[comparisonOperator]) {
      currentAggregationPipeline.push({
        $match: {
          "debtInfo.items.startDate": dateFilter[comparisonOperator],
        },
      });

      finishedAggregationPipeline.push({
        $match: {
          "debtInfo.items.startDate": dateFilter[comparisonOperator],
        },
      });
    }

    currentAggregationPipeline.push({
      $group: {
        _id: null,
        count: { $sum: 1 },
        totalAmountFromFoundation: {
          $sum: "$debtInfo.items.amountFromFoundation",
        },
        totalPaidFromFoundation: {
          $sum: "$debtInfo.items.paidFromFoundation",
        },
      },
    });

    finishedAggregationPipeline.push({
      $group: {
        _id: null,
        count: { $sum: 1 },
        totalAmountFromFoundation: {
          $sum: "$debtInfo.items.amountFromFoundation",
        },
        totalPaidFromFoundation: {
          $sum: "$debtInfo.items.paidFromFoundation",
        },
      },
    });

    const currentStatistics = await Case.aggregate(currentAggregationPipeline);
    const finishedstatistics = await Case.aggregate(
      finishedAggregationPipeline
    );

    res.status(200).json({
      current: currentStatistics[0],
      finished: finishedstatistics[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddDebt,
  handleSelectDebtCases,
  handleGetDebtStatistics,
};
