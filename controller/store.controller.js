const STATUS_CODES = require("../utils/statusCodes");
const Product = require("../model/Product.model");
const StoreBenefit = require("../model/StoreBenefit.model");
const Deal = require("../model/Deal.model");

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

const handleGetProducts = async (req, res, next) => {
  try {
    const products = await Product.find(req.query);
    if (!products)
      return res.status(STATUS_CODES.SUCCESS).json({ message: "no products" });

    res.status(STATUS_CODES.SUCCESS).json({ products });
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
        ssh,
        name,
        products: validProducts,
        time,
        desc,
      });
    }

    res.status(STATUS_CODES.CREATED).json({
      message: `${
        validProducts.length > 0
          ? validProducts?.join(",") + ", added successfully"
          : ""
      }`,
      errMessage: `${errorMsgs?.join(",")}`,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetBenefits = async (req, res, next) => {
  try {
    const query = req.query;
    const benefits = await StoreBenefit.find(query);
    if (!benefits)
      return res.status(STATUS_CODES.SUCCESS).json({ message: "no benefits" });

    res.status(STATUS_CODES.SUCCESS).json({ benefits });
  } catch (error) {
    next(error);
  }
};

const handleAddDeal = async (req, res, next) => {
  try {
    const {
      sector,
      dealType,
      category,
      status,
      count,
      price,
      totalPrice,
      date,
      desc,
      file,
    } = req.body;

    const newDeal = await Deal.create({
      sector,
      dealType,
      category,
      status,
      count,
      price,
      totalPrice,
      date,
      desc,
      file,
    });

    const existedProduct = await Product.findOne({ category, status });

    if (!existedProduct) {
      await Product.create({
        category,
        status,
        countInStock: count,
      });
    } else {
      const prevCount = existedProduct.countInStock;
      existedProduct.countInStock = prevCount + count;
      await existedProduct.save();
    }

    res
      .status(STATUS_CODES.CREATED)
      .json({ message: "created.", deal: newDeal });
  } catch (error) {
    next(error);
  }
};

const handleGetDeals = async (req, res, next) => {
  try {
    const query = req.query;
    const deals = await Deal.find(query);
    if (!deals)
      return res.status(STATUS_CODES.SUCCESS).json({ message: "no deals" });

    res.status(STATUS_CODES.SUCCESS).json({ deals });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddProduct,
  handleAddBenefit,
  handleGetProducts,
  handleGetBenefits,
  handleAddDeal,
  handleGetDeals,
};
