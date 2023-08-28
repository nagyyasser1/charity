const {
  handleAddMonthlyDataToCase,
  handleSelectMonthlyCases,
  handleUpdateMonthlyCase,
} = require("../controller/case.monthly.controller");
const caseExist = require("../middleware/case/caseExist");
const { validate_case_data } = require("../middleware/case/data-validation");
const CASE_TYPES = require("../utils/caseTypes");

const router = require("express").Router();

// @desc monthly route handler
// @route /case/monthly

router.post(
  "/:caseId",
  caseExist,
  validate_case_data(CASE_TYPES.MONTHLY),
  handleAddMonthlyDataToCase
);
router.get("/", handleSelectMonthlyCases);
// router.put("/:caseId", handleUpdateMonthlyCase);

module.exports = router;
