const router = require("express").Router();
const { getCases, addCase } = require("../controller/case.controller");
const addDependent = require("../middleware/addDependent");
const { validateCaseData } = require("../middleware/caseDataValidation");

router.get("/", getCases);
router.post("/", validateCaseData, addDependent, addCase);

module.exports = router;
