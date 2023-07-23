const router = require("express").Router();
const { getCases } = require("../controller/case.controller");
const saveCaseMDW = require("../middleware/addCase");
const addDependent = require("../middleware/addDependent");
const { validateCaseData } = require("../middleware/caseDataValidation");
const commitSessionMiddleware = require("../middleware/commitSessionMDW");
const startSessionMiddleware = require("../middleware/startSessionMDW");

router.get("/", getCases);
router.post(
  "/",
  validateCaseData,
  startSessionMiddleware,
  addDependent,
  saveCaseMDW,
  commitSessionMiddleware,
  (req, res) => {
    res.status(201).json(req.case);
  }
);

module.exports = router;
