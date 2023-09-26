const Product = require("../../model/Product.model");
const STATUS_CODES = require("../../utils/statusCodes");
const { CustomError } = require("../system/errorHandler");

const productExist = async (req, res, next) => {
  try {
    const { category, status } = req.body;

    if (!category || !status)
      throw new CustomError(
        STATUS_CODES.BAD_REQUEST,
        "category or status not provided!"
      );

    const existedProduct = await Product.findOne({ category, status });

    if (existedProduct === null) {
      next();
    } else {
      throw new CustomError(
        STATUS_CODES.CONFLICT,
        `${category} and ${status}, elready exist`
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = productExist;
