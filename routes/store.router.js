const {
  handleAddProduct,
  handleAddBenefit,
  handleGetProducts,
  handleGetBenefits,
  handleAddDeal,
} = require("../controller/store.controller");
const {
  validate_product_data,
  validate_benefit_data,
  validate_deal_data,
} = require("../middleware/store/data-validation");
const productExist = require("../middleware/store/productExist");

const router = require("express").Router();

router.post("/product", validate_product_data, productExist, handleAddProduct);
router.get("/products", handleGetProducts);
router.post("/benefit", validate_benefit_data, handleAddBenefit);
router.get("/benefits", handleGetBenefits);
router.post("/deal", validate_deal_data, handleAddDeal);

module.exports = router;
