const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  firstname: {
    type: String,
    required: true,
  },
  midname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["poor", "widows", "orphans"],
  },
  phone: {
    type: [Number],
    required: true,
  },
  deserve: {
    type: String,
    required: true,
    enum: ["yes", "no", "wating"],
  },
  salary: {
    type: Number,
    required: true,
    min: 200,
    max: 500,
  },
  box: {
    type: Number,
    default: 1,
  },
  checkDate: {
    type: Date,
    required: true,
  },
  startDate: {
    type: Date,
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
  town: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  document: [String],
  dependent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dependent",
    },
  ],
  researchOpinions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResearchOpinion",
    },
  ],
});

const Case = mongoose.model("Case", caseSchema);

module.exports = Case;
