const Box = require("../model/Box.model");
const STATUS_CODES = require("../utils/statusCodes");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const box = new Box(req.body);
    await box.save();
    res.status(STATUS_CODES.SUCCESS).json(box);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const boxs = await Box.find({});
    res.status(STATUS_CODES.SUCCESS).send(boxs);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const box = await Box.findById(req.params.id);
    res.status(STATUS_CODES.SUCCESS).send(box);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const res = await Box.findByIdAndDelete(req.params.id);
    res.status(STATUS_CODES.SUCCESS).send(res);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
