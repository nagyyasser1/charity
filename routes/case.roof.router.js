const {
  handleAddRoofDataToCase,
  handleSelectRoofCases,
  handleGetRoofStatistics,
} = require("../controller/case.roof.controller");
const caseExist = require("../middleware/case/caseExist");
const { validate_case_data } = require("../middleware/case/data-validation");
const CASE_TYPES = require("../utils/caseTypes");

const router = require("express").Router();

router.post(
  "/:caseId",
  caseExist,
  validate_case_data(CASE_TYPES.ROOF),
  handleAddRoofDataToCase
);

// router.post("/file/:caseId");
router.get("/", handleSelectRoofCases);
router.get("/statistics", handleGetRoofStatistics);

module.exports = router;
