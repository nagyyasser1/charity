const mongoose = require("mongoose");
const storeBenefitSchema = new mongoose.Schema({
  ssh: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  products: {
    type: [Object],
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  desc: {
    type: String,
  },
});

const StoreBenefit = mongoose.model("StoreBenefit", storeBenefitSchema);
module.exports = StoreBenefit;
