const {
  handleAddLoanToCase,
  handleSelectLoanCases,
  handleGetLoanStatistics,
} = require("../controller/case.loan.controller");
const caseExist = require("../middleware/case/caseExist");
const { validate_case_data } = require("../middleware/case/data-validation");
const CASE_TYPES = require("../utils/caseTypes");

const router = require("express").Router();

router.post(
  "/:caseId",
  caseExist,
  validate_case_data(CASE_TYPES.LOAN),
  handleAddLoanToCase
);

router.get("/", handleSelectLoanCases);

router.get("/statistics", handleGetLoanStatistics);
module.exports = router;
