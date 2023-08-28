const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    ssh: {
      type: Number,
      unique: true,
      required: true,
    },
    caseType: [String],
    info: {
      type: Object,
      required: true,
    },
    monthlyInfo: {
      type: Object,
    },
    roofInfo: {
      type: Object,
    },
    loanInfo: {
      type: Object,
    },
    debtInfo: {
      type: Object,
    },
    treatmentInfo: {
      type: Object,
    },
    furnitureInfo: {
      type: Object,
    },
    operationInfo: {
      type: Object,
    },
  },
  {
    strict: false,
  }
);

const Case = mongoose.model("Case", caseSchema);

module.exports = Case;
