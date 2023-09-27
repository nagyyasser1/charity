const {
  handleAddProduct,
  handleAddBenefit,
  handleGetProducts,
  handleGetBenefits,
  handleAddDeal,
  handleGetDeals,
} = require("../controller/store.controller");
const {
  validate_product_data,
  validate_benefit_data,
  validate_deal_data,
} = require("../middleware/store/data-validation");
const productExist = require("../middleware/store/productExist");

const router = require("express").Router();

router
  .route("/product")
  .post(validate_product_data, productExist, handleAddProduct)
  .get(handleGetProducts);

router
  .route("/benefit")
  .post(validate_benefit_data, handleAddBenefit)
  .get(handleGetBenefits);

router
  .route("/deal")
  .post(validate_deal_data, handleAddDeal)
  .get(handleGetDeals);

module.exports = router;
