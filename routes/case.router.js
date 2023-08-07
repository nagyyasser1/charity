const router = require("express").Router();
const {
  getCases,
  getCaseById,
  updateOneCase,
  deleteOneCase,
} = require("../controller/case.controller");
const LinkDependetWithItsCase = require("../middleware/LinkDependetWithItsCase");
const saveCaseMDW = require("../middleware/addCase");
const addDependent = require("../middleware/addDependent");
const { validateCaseData } = require("../middleware/caseDataValidation");
const commitSessionMiddleware = require("../middleware/commitSessionMDW");
const startSessionMiddleware = require("../middleware/startSessionMDW");
const validID = require("../middleware/validID");

router.get("/", getCases);
router.get("/:id", validID, getCaseById);
router.post(
  "/",
  validateCaseData,
  startSessionMiddleware,
  addDependent,
  saveCaseMDW,
  LinkDependetWithItsCase,
  commitSessionMiddleware,
  (req, res) => {
    res.status(201).json(req.case);
  }
);
router.put("/:id", validID, updateOneCase);
router.delete("/:id", validID, deleteOneCase);

module.exports = router;
