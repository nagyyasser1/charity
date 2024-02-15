const mongoose = require("mongoose");

const townSchema = new mongoose.Schema({
  town: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Town", townSchema);
