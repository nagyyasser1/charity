const router = require("express").Router();
const fileUpload = require("express-fileupload");
const {
  getCases,
  getCaseById,
  updateOneCase,
  deleteOneCase,
  addCase,
} = require("../controller/case.controller");
const { validateData } = require("../middleware/case/caseValidate");
const validBoxID = require("../middleware/validBoxID");
const validID = require("../middleware/validID");

router.get("/", getCases);
router.get("/:id", validID, getCaseById);
router.post(
  "/",
  fileUpload({ createParentPath: true }),
  (req, res, next) => {
    const address = req.body.address;
    const dependents = req.body.dependents;

    if (typeof address === "string") {
      const parsedAddress = JSON.parse(address);
      req.body.address = parsedAddress;
    }

    if (typeof dependents === "string") {
      req.body.dependents = JSON.parse(req.body.dependents);
    }

    next();
  },
  validateData,
  validBoxID,
  addCase
);
router.put("/:id", validID, updateOneCase);
router.delete("/:id", validID, deleteOneCase);

module.exports = router;
