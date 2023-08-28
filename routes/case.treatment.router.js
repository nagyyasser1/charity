const router = require("express").Router();
const {
  handleAddTreatment,
  handleSelectTreatmentCases,
} = require("../controller/case.treatment.controller");
const caseExist = require("../middleware/case/caseExist");
const { validate_case_data } = require("../middleware/case/data-validation");
const CASE_TYPES = require("../utils/caseTypes");

router.post(
  "/:caseId",
  caseExist,
  validate_case_data(CASE_TYPES.TREATMENT),
  handleAddTreatment
);

router.get("/", handleSelectTreatmentCases);

module.exports = router;
