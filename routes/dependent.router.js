const {
  getDependent,
  getAllDeps,
} = require("../controller/dependent.controller");

const router = require("express").Router();

router.get("/:id", getDependent);
router.get("/", getAllDeps);

module.exports = router;
