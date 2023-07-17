const mongoose = require("mongoose");

const dependentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  study: {
    type: Boolean,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
});

const Dependent = mongoose.model("Dependent", dependentSchema);

module.exports = Dependent;
