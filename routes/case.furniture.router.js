const {
  handleAddFurniture,
  handleSelectFurniture,
} = require("../controller/case.furniture.controller");
const caseExist = require("../middleware/case/caseExist");
const { validate_case_data } = require("../middleware/case/data-validation");
const CASE_TYPES = require("../utils/caseTypes");

const router = require("express").Router();

router.post(
  "/:caseId",
  caseExist,
  validate_case_data(CASE_TYPES.FURNITURE),
  handleAddFurniture
);

router.get("/", handleSelectFurniture);

module.exports = router;
