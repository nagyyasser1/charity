const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  status: {
    type: String,
  },
  countInStock: {
    type: Number,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
