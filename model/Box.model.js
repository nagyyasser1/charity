const mongoose = require("mongoose");

const boxSchema = new mongoose.Schema(
  {
    sector: {
      type: String,
      enum: ["factory", "foundation"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Box = mongoose.model("Box", boxSchema);

module.exports = Box;
