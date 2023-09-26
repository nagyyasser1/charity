const STATUS_CODES = require("../utils/statusCodes");
const Product = require("../model/Product.model");
const StoreBenefit = require("../model/StoreBenefit.model");

const handleAddProduct = async (req, res, next) => {
  try {
    const { category, status, countInStock } = req.body;
    const newProduct = new Product({ category, status, countInStock });
    await newProduct.save();
    res.status(STATUS_CODES.CREATED).json({ message: "created." });
  } catch (error) {
    next(error);
  }
};

const handleAddBenefit = async (req, res, next) => {
  try {
    const { ssh, name, products, time, desc } = req.body;

    let errorMsgs = [];
    let validProducts = [];

    for (let i = 0; i < products.length; i++) {
      console.log(products[i]);
      const existedProduct = await Product.findOne({
        category: products[i].category,
        status: products[i].status,
      });

      if (!existedProduct)
        errorMsgs.push(
          `product with category "${products[i].category}" not exist`
        );

      if (existedProduct?.countInStock <= 0) {
        errorMsgs.push(
          `product with category ${products[i].category} has 0 count`
        );
      }

      if (existedProduct) {
        existedProduct.countInStock--;
      }

      await existedProduct.save();

      validProducts.push(products[i].category);
    }

    if (validProducts.length > 0) {
      await StoreBenefit.create({
        ssh,
        name,
        products: validProducts,
        time,
        desc,
      });
    }

    res.status(STATUS_CODES.CREATED).json({
      message: `${validProducts?.join(",")} successfully addedd`,
      errMessage: errorMsgs?.join(","),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddProduct,
  handleAddBenefit,
};
