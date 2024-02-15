const Case = require("../model/Case.model");
const STATUS_CODES = require("../utils/statusCodes");
const { CustomError } = require("../middleware/system/errorHandler");
const Town = require("../model/Town.model");

const handleAddRoofDataToCase = async (req, res, next) => {
  try {
    const { case_data } = res.locals;

    if (case_data?.caseType?.includes("roof"))
      throw new CustomError(
        STATUS_CODES.CONFLICT,
        "this case aready have roofReapir"
      );

    case_data.caseType.push("roof");

    case_data.roofInfo = {
      ...req.body,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      date: new Date(req.body.date),
    };
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

const handleGetRoofStatistics = async (req, res, next) => {
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
          caseType: "roof",
        },
      },
    ];

    const dateFilter = {
      gt: { $gt: queryDate },
      lt: { $lt: queryDate },
    };

    if (dateFilter[comparisonOperator]) {
      aggregationPipeline.push({
        $match: {
          "roofInfo.startDate": dateFilter[comparisonOperator],
        },
      });
    }

    const towns = await Town.find({});

    const groupPiplineObj = {
      _id: null,
      countAllRoofCases: { $sum: 1 },
      totalCost: {
        $sum: {
          $cond: [
            { $eq: ["$roofInfo.approvalStatus", "yes"] },
            "$roofInfo.cost",
            0,
          ],
        },
      },
    };

    if (towns.length > 0) {
      towns.forEach((e) => {
        groupPiplineObj[e.town] = {
          $sum: {
            $cond: [{ $eq: ["$info.address.town", `${e.town}`] }, 1, 0],
          },
        };
      });
    }

    aggregationPipeline.push({
      $group: groupPiplineObj,
    });

    const countWaitingCases = await Case.aggregate([
      {
        $match: {
          caseType: "roof",
          "roofInfo.approvalStatus": "waiting",
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          waitingCost: {
            $sum: "$roofInfo.cost",
          },
        },
      },
    ]);

    const statistics = await Case.aggregate(aggregationPipeline);

    statistics[0]["countWating"] =
      countWaitingCases.length > 0 ? countWaitingCases[0].count : 0;
    statistics[0]["waitingCost"] =
      countWaitingCases.length > 0 ? countWaitingCases[0].waitingCost : 0;
    res.status(200).json(statistics[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddRoofDataToCase,
  handleSelectRoofCases,
  handleGetRoofStatistics,
};
