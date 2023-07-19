const router = require("express").Router();
const { getCases, addCase } = require("../controller/case.controller");
const { validateCaseData } = require("../middleware/caseDataValidation");

router.get("/", getCases);
router.post("/", validateCaseData, addCase);

module.exports = router;
