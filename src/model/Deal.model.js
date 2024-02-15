const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    sector: {
      type: String,
      required: true,
    },
    dealType: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    desc: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  { timestamps: true }
);

const Deal = mongoose.model("Deal", dealSchema);

module.exports = Deal;
