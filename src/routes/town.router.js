const {
  handleAddTown,
  handleGetAllTown,
} = require("../controller/town.controller");

const router = require("express").Router();

router.post("/", handleAddTown);
router.get("/", handleGetAllTown);

module.exports = router;
