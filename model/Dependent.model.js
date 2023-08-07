const mongoose = require("mongoose");

const dependentSchema = new mongoose.Schema(
  {
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
    studyLevel: {
      type: String,
      enum: ["primary", "secondary", "high", "university"],
    },
    disabled: {
      type: Boolean,
      required: true,
    },
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
    },
  },
  { strict: false }
);

const Dependent = mongoose.model("Dependent", dependentSchema);

module.exports = Dependent;
