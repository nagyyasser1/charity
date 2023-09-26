const {
  handleAddProduct,
  handleAddBenefit,
} = require("../controller/store.controller");
const {
  validate_product_data,
  validate_benefit_data,
} = require("../middleware/store/data-validation");
const productExist = require("../middleware/store/productExist");

const router = require("express").Router();

router.post("/product", validate_product_data, productExist, handleAddProduct);
router.post("/benefit", validate_benefit_data, handleAddBenefit);

module.exports = router;
