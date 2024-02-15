const { CustomError } = require("../middleware/system/errorHandler");
const Case = require("../model/Case.model");
const CASE_TYPES = require("../utils/caseTypes");
const STATUS_CODES = require("../utils/statusCodes");

const handleAddMonthlyDataToCase = async (req, res, next) => {
  try {
    const { case_data } = res.locals;

    if (case_data?.caseType?.includes(CASE_TYPES.MONTHLY))
      throw new CustomError(
        STATUS_CODES.CONFLICT,
        "this case aready have Monthly program"
      );

    case_data.caseType.push(CASE_TYPES.MONTHLY);
    case_data.monthlyInfo = {
      ...req.body,
      birthdate: new Date(req.body.birthdate),
      startDate: new Date(req.body.startDate),
    };
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
    const queryCriteria = { caseType: "monthly" }; // Default criteria to select monthly cases

    // Iterate over query parameters and add conditions dynamically
    for (const key in req.query) {
      console.log(key);
      switch (key) {
        case "approvalStatus":
          queryCriteria["monthlyInfo.approvalStatus"] = req.query[key];
          break;
        case "socialStatus":
          queryCriteria["monthlyInfo.socialStatus"] = req.query[key];
          break;
        case "sector":
          queryCriteria["monthlyInfo.sector"] = req.query[key];
          break;
        case "cashBenefits":
          queryCriteria["monthlyInfo.cashBenefits"] = req.query[key];
          break;
        case "birthdate":
          queryCriteria["monthlyInfo.birthdate"] = req.query[key];
          break;
        case "hasDependents":
          // Check if dependents array exists and has items
          if (req.query[key] === "true") {
            queryCriteria["monthlyInfo.dependents"] = {
              $exists: true,
              $not: { $size: 0 },
            };
          } else if (req.query[key] === "false") {
            queryCriteria["monthlyInfo.dependents"] = {
              $exists: true,
              $size: 0,
            };
          }

          break;
      }
    }

    const monthly_cases = await Case.find(queryCriteria);

    res.status(STATUS_CODES.SUCCESS).json({
      message: "success",
      count: monthly_cases.length,
      monthly_cases,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetMonthlyStatistics = async (req, res, next) => {
  try {
    const queryDateStr = req.query.startDate;
    const comparisonOperator = req.query.comparisonOperator;

    if (!queryDateStr || !comparisonOperator) {
      return res
        .status(400)
        .send("Both startDate and comparisonOperator are required");
    }

    const queryDate = new Date(queryDateStr);

    const dateFilter = {
      gt: { $gt: queryDate },
      lt: { $lt: queryDate },
    };

    const foundationStatistics = await Case.aggregate([
      {
        $match: {
          caseType: "monthly",
          "monthlyInfo.approvalStatus": "yes",
          "monthlyInfo.sector": "foundation",
          "monthlyInfo.startDate": dateFilter[comparisonOperator],
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          poor_count: {
            $sum: {
              $cond: [{ $eq: ["$monthlyInfo.socialStatus", "poor"] }, 1, 0],
            },
          },
          orphan_count: {
            $sum: {
              $cond: [{ $eq: ["$monthlyInfo.socialStatus", "orphan"] }, 1, 0],
            },
          },
          widow_count: {
            $sum: {
              $cond: [{ $eq: ["$monthlyInfo.socialStatus", "widow"] }, 1, 0],
            },
          },
          totalCashBenefits: { $sum: "$monthlyInfo.cashBenefits" },
          totalBoxCount: { $sum: "$monthlyInfo.boxCount" },
        },
      },
    ]);

    const factoryStatistics = await Case.aggregate([
      {
        $match: {
          caseType: "monthly",
          "monthlyInfo.approvalStatus": "yes",
          "monthlyInfo.sector": "factory",
          "monthlyInfo.startDate": dateFilter[comparisonOperator],
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          poor_count: {
            $sum: {
              $cond: [{ $eq: ["$monthlyInfo.socialStatus", "poor"] }, 1, 0],
            },
          },
          orphan_count: {
            $sum: {
              $cond: [{ $eq: ["$monthlyInfo.socialStatus", "orphan"] }, 1, 0],
            },
          },
          widow_count: {
            $sum: {
              $cond: [{ $eq: ["$monthlyInfo.socialStatus", "widow"] }, 1, 0],
            },
          },
          totalCashBenefits: { $sum: "$monthlyInfo.cashBenefits" },
          totalBoxCount: { $sum: "$monthlyInfo.boxCount" },
        },
      },
    ]);

    const countWaiting = await Case.find({
      "monthlyInfo.approvalStatus": "waiting",
    }).count();
    const countNo = await Case.find({
      "monthlyInfo.approvalStatus": "no",
    }).count();

    res.status(200).json({
      foundation: foundationStatistics[0],
      factory: factoryStatistics[0],

      extra: {
        waitingCount: countWaiting,
        NoCount: countNo,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddMonthlyDataToCase,
  handleSelectMonthlyCases,
  handleGetMonthlyStatistics,
};
