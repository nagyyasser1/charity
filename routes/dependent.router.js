const {
  getDependent,
  getAllDeps,
} = require("../controller/dependent.controller");
const validID = require("../middleware/validID");

const router = require("express").Router();

router.get("/:id", validID, getDependent);
router.get("/", getAllDeps);

module.exports = router;
