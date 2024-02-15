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
      case_data.treatmentInfo = [];
    }

    let { treatmentInfo } = case_data;

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

    const newTreatmentItem = {
      approvalStatus,
      isUrgent,
      name,
      price,
      researcher,
      startDate: new Date(startDate),
      description,
      monthly,
      finished,
    };

    treatmentInfo.push(newTreatmentItem);

    case_data.treatmentInfo = treatmentInfo;

    const updated_case = await Case.findByIdAndUpdate(caseId, case_data, {
      new: true,
    });

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "treatment added to case", caseData: updated_case });
  } catch (error) {
    next(error);
  }
};

const handleSelectTreatmentCases = async (req, res, next) => {
  try {
    const treatment_cases = await Case.find({
      caseType: {
        $in: ["treatment"],
      },
    });
    // if (!monthly_cases || monthly_cases?.length <= 0)
    // throw new CustomError(
    //     STATUS_CODES.NOT_FOUND,
    //     "there is no monthly cases"
    // );
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "success", treatment_cases });
  } catch (error) {
    next(error);
  }
};

const handleGetTreatmentStatistics = async (req, res, next) => {
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
          caseType: "treatment",
        },
      },
      {
        $unwind: "$treatmentInfo",
      },
    ];

    if (comparisonOperator === "gt") {
      aggregationPipeline.push({
        $match: {
          "treatmentInfo.startDate": {
            $gt: queryDate,
          },
        },
      });
    } else if (comparisonOperator === "lt") {
      aggregationPipeline.push({
        $match: {
          "treatmentInfo.dstartDate": {
            $lt: queryDate,
          },
        },
      });
    }

    aggregationPipeline.push({
      $group: {
        _id: null,
        countAllTreatments: {
          $sum: 1,
        },
        countYesTreatments: {
          $sum: {
            $cond: [
              {
                $eq: ["$treatmentInfo.approvalStatus", "yes"],
              },
              1,
              0,
            ],
          },
        },
        countNoTreatments: {
          $sum: {
            $cond: [
              {
                $eq: ["$treatmentInfo.approvalStatus", "no"],
              },
              1,
              0,
            ],
          },
        },
        countWaitingTreatments: {
          $sum: {
            $cond: [
              {
                $eq: ["$treatmentInfo.approvalStatus", "waiting"],
              },
              1,
              0,
            ],
          },
        },
        totalCostForYesCurrentFromFoundation: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$treatmentInfo.approvalStatus", "yes"] },
                  { $eq: ["$treatmentInfo.finished", false] },
                ],
              },
              "$treatmentInfo.price",
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
  handleAddTreatment,
  handleSelectTreatmentCases,
  handleGetTreatmentStatistics,
};
