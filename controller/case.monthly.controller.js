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
    // Query to get statistics
    const statistics = await Case.aggregate([
      {
        $match: {
          caseType: "monthly",
        },
      },
      {
        $group: {
          _id: null,
          countAllMonthlyCases: { $sum: 1 },
          countPoorSocialStatus: {
            $sum: {
              $cond: [{ $eq: ["$monthlyInfo.socialStatus", "poor"] }, 1, 0],
            },
          },
          countOrphanSocialStatus: {
            $sum: {
              $cond: [{ $eq: ["$monthlyInfo.socialStatus", "orphans"] }, 1, 0],
            },
          },
          countWidowsSocialStatus: {
            $sum: {
              $cond: [{ $eq: ["$monthlyInfo.socialStatus", "widows"] }, 1, 0],
            },
          },
          countFoundationSector: {
            $sum: {
              $cond: [{ $eq: ["$monthlyInfo.sector", "foundation"] }, 1, 0],
            },
          },
          countFactorySector: {
            $sum: {
              $cond: [{ $eq: ["$monthlyInfo.sector", "factory"] }, 1, 0],
            },
          },
          countYesApprovalStatus: {
            $sum: {
              $cond: [{ $eq: ["$monthlyInfo.approvalStatus", "yes"] }, 1, 0],
            },
          },
          countNoApprovalStatus: {
            $sum: {
              $cond: [{ $eq: ["$monthlyInfo.approvalStatus", "no"] }, 1, 0],
            },
          },
          countWaitingApprovalStatus: {
            $sum: {
              $cond: [
                { $eq: ["$monthlyInfo.approvalStatus", "waiting"] },
                1,
                0,
              ],
            },
          },
          totalCashBenefits: { $sum: "$monthlyInfo.cashBenefits" },
          totalBoxCount: { $sum: "$monthlyInfo.boxCount" },
          countAllDependents: {
            $sum: {
              $cond: [
                { $isArray: "$monthlyInfo.dependents" },
                { $size: "$monthlyInfo.dependents" },
                0,
              ],
            },
          },
        },
      },
    ]);

    res.status(200).json(statistics[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddMonthlyDataToCase,
  handleSelectMonthlyCases,
  handleGetMonthlyStatistics,
};
