const Case = require("../model/Case.model");
const CASE_TYPES = require("../utils/caseTypes");
const STATUS_CODES = require("../utils/statusCodes");

const handleAddFurniture = async (req, res, next) => {
  try {
    const { caseId } = req.params;
    let { case_data } = res.locals;

    if (!case_data?.caseType?.includes(CASE_TYPES.FURNITURE)) {
      case_data.caseType.push(CASE_TYPES.FURNITURE);
    }

    if (case_data?.furnitureInfo === undefined) {
      case_data.furnitureInfo = {
        items: [],
        totalPrice: 0,
      };
    }

    let { items } = case_data.furnitureInfo;

    const { devices, totalPrice, approvalStatus } = req.body;

    const newFurnitureItem = {
      devices,
      totalPrice,
      approvalStatus,
    };

    items.push(newFurnitureItem);

    case_data.furnitureInfo.items = items;
    case_data.furnitureInfo.totalPrice += +totalPrice;

    const updated_case = await Case.findByIdAndUpdate(caseId, case_data, {
      new: true,
    });

    res.status(STATUS_CODES.SUCCESS).json({
      message: "furniture added to case",
      caseData: updated_case,
    });
  } catch (error) {
    next(error);
  }
};

const handleSelectFurniture = async (req, res, next) => {
  try {
    const furniture_cases = await Case.find({
      caseType: { $in: ["furniture"] },
    });
    // if (!loan_cases || loan_cases?.length <= 0)
    //   throw new CustomError(
    //     STATUS_CODES.NOT_FOUND,
    //     "there is no loan cases"
    //   );
    res.status(STATUS_CODES.SUCCESS).json({
      message: "success",
      furniture_cases,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddFurniture,
  handleSelectFurniture,
};
