const {
  handleSelectOperationCases,
  handleAddOperation,
} = require("../controller/case.operation.controller");
const caseExist = require("../middleware/case/caseExist");
const { validate_case_data } = require("../middleware/case/data-validation");
const CASE_TYPES = require("../utils/caseTypes");

const router = require("express").Router();

router.post(
  "/:caseId",
  caseExist,
  validate_case_data(CASE_TYPES.OPERATION),
  handleAddOperation
);

router.get("/", handleSelectOperationCases);

module.exports = router;
