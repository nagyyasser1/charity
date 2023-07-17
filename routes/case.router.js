const router = require("express").Router();
const { getAllCases } = require("../controller/case.controller");

router.get("/", getAllCases);

module.exports = router;
