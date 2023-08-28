const router = require("express").Router();
const {
  handleAddDebt,
  handleSelectDebtCases,
} = require("../controller/case.debt.controller");
const caseExist = require("../middleware/case/caseExist");
const { validate_case_data } = require("../middleware/case/data-validation");
const CASE_TYPES = require("../utils/caseTypes");

router.post(
  "/:caseId",
  caseExist,
  validate_case_data(CASE_TYPES.DEBT),
  handleAddDebt
);

router.get("/", handleSelectDebtCases);

module.exports = router;
