const Case = require("../model/Case.model");
const Product = require("../model/Product.model");
const StoreBenefit = require("../model/StoreBenefit.model");
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
      };
    }

    let { items } = case_data.furnitureInfo;

    const { products, approvalStatus } = req.body;

    // ----------------

    let errorMsgs = [];
    let validProducts = [];

    for (let i = 0; i < products.length; i++) {
      const existedProduct = await Product.findOne({
        category: products[i].category,
        status: products[i].status,
      });

      if (!existedProduct) {
        errorMsgs.push(`category "${products[i].category}" not exist`);
        continue;
      }

      if (existedProduct?.countInStock <= 0) {
        errorMsgs.push(`category ${products[i].category} has 0 count`);
        continue;
      }

      if (existedProduct) {
        existedProduct.countInStock--;
        await existedProduct.save();
        validProducts.push(products[i].category);
      }
    }

    if (validProducts.length > 0) {
      await StoreBenefit.create({
        ssh: case_data?.ssh,
        name: case_data?.info?.name,
        products: validProducts,
        time: Date.now(),
        desc: "تجهيز عروسه من الحالات ",
      });
    }

    //=========================
    const newFurnitureItem = {
      products: validProducts,
      approvalStatus,
    };

    items.push(newFurnitureItem);

    case_data.furnitureInfo.items = items;

    const updated_case = await Case.findByIdAndUpdate(caseId, case_data, {
      new: true,
    });

    res.status(STATUS_CODES.CREATED).json({
      message: `${
        validProducts.length > 0
          ? validProducts?.join(",") + ", added successfully"
          : ""
      }`,
      errMessage: `${errorMsgs?.join(",")}`,
      case: updated_case,
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
