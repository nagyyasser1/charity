const {
  handleGetCaseById,
  handleGetAllCases,
  handleAddBasicCase,
  handleDeleteAllCases,
  getCasesBySearch,
  updateOneCase,
} = require("../controller/case.controller");

const { validate_case_data } = require("../middleware/case/data-validation");
const CASE_TYPES = require("../utils/caseTypes");

const router = require("express").Router();

// @route /case
router.get("/search", getCasesBySearch);

router
  .route("/")
  .post(validate_case_data(CASE_TYPES.BASIC), handleAddBasicCase)
  .get(handleGetAllCases)
  .delete(handleDeleteAllCases);

router.route("/:id").put(updateOneCase).get(handleGetCaseById);

module.exports = router;
