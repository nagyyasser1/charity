const {
  handleGetCaseById,
  handleGetAllCases,
  handleAddBasicCase,
} = require("../controller/case.controller");

const { validate_case_data } = require("../middleware/case/data-validation");
const CASE_TYPES = require("../utils/caseTypes");

const router = require("express").Router();

// @route /case
router.post("/", validate_case_data(CASE_TYPES.BASIC), handleAddBasicCase); // Create new case in the system with basic info
router.get("/", handleGetAllCases); // Get all cases
router.get("/:id", handleGetCaseById); // get case by id

module.exports = router;
