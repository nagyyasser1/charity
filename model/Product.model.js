const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    unique: true,
  },
  countInStock: {
    type: Number,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
