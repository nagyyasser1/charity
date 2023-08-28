const {
  handleAddRoofDataToCase,
  handleSelectRoofCases,
} = require("../controller/case.roof.controller");
const caseExist = require("../middleware/case/caseExist");
const { validate_case_data } = require("../middleware/case/data-validation");
const CASE_TYPES = require("../utils/caseTypes");

const router = require("express").Router();

// @desc monthly route handler
// @route /case/monthly
router.post(
  "/:caseId",
  caseExist,
  validate_case_data(CASE_TYPES.ROOF),
  handleAddRoofDataToCase
);

router.get("/", handleSelectRoofCases);

module.exports = router;
