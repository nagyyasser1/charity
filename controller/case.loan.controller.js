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
      rest,
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
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      slideCount,
      paid,
      rest,
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
    const queryCriteria = {
      caseType: "loan",
      "loanInfo.items": {
        $elemMatch: {},
      },
    };

    for (const key in req.query) {
      console.log(key);
      switch (key) {
        case "approvalStatus":
          queryCriteria["loanInfo.items.$elemMatch.approvalStatus"] =
            req.query[key];
          break;
        case "isUrgent":
          queryCriteria["loanInfo.items.$elemMatch.isUrgent"] =
            req.query[key] === "true"; // Assuming it's a boolean
          break;
        case "cost":
          queryCriteria["loanInfo.items.$elemMatch.cost"] = parseInt(
            req.query[key]
          ); // Parse to an integer
          break;
      }
    }

    const loan_cases = await Case.find(queryCriteria);

    res.status(STATUS_CODES.SUCCESS).json({
      message: "success",
      count: loan_cases.length,
      loan_cases,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetLoanStatistics = async (req, res, next) => {
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
          caseType: "loan",
          "loanInfo.items.approvalStatus": "yes",
          "loanInfo.items.finished": false,
        },
      },
      {
        $unwind: "$loanInfo.items",
      },
      {
        $match: {
          "loanInfo.items.approvalStatus": "yes",
          "loanInfo.items.finished": false,
        },
      },
    ];

    if (comparisonOperator === "gt") {
      aggregationPipeline.push({
        $match: {
          "loanInfo.items.startDate": { $gt: queryDate },
        },
      });
    } else if (comparisonOperator === "lt") {
      aggregationPipeline.push({
        $match: {
          "loanInfo.items.startDate": { $lt: queryDate },
        },
      });
    }

    aggregationPipeline.push({
      $group: {
        _id: null,
        count: { $sum: 1 },
        totalCost: { $sum: "$loanInfo.items.cost" },
        totalRecievedMoney: { $sum: "$loanInfo.items.paid" },
        totalRest: { $sum: "$loanInfo.items.rest" },
      },
    });

    const currentStatistics = await Case.aggregate(aggregationPipeline);

    const waitingCount = await Case.find({
      "loanInfo.items.approvalStatus": "waiting",
    }).count();

    const finishedStatistics = await Case.aggregate([
      {
        $match: {
          caseType: "loan",
          "loanInfo.items.approvalStatus": "yes",
          "loanInfo.items.finished": true,
        },
      },
      {
        $unwind: "$loanInfo.items",
      },
      {
        $match: {
          "loanInfo.items.approvalStatus": "yes",
          "loanInfo.items.finished": true,
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          paidFromFoundation: { $sum: "$loanInfo.items.cost" },
          totalReceivedMoney: { $sum: "$loanInfo.items.paid" },
          totalRest: { $sum: "$loanInfo.items.rest" },
        },
      },
    ]);

    resObj = {
      current: currentStatistics[0],
      finished: finishedStatistics[0],
      extra: {
        waitingCount,
      },
    };
    res.status(200).json(resObj);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddLoanToCase,
  handleSelectLoanCases,
  handleGetLoanStatistics,
};
