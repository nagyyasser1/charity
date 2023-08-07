const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    SSH: {
      type: Number,
      unique: true,
      required: true,
    },
    Box: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Box",
    },
    Dependent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dependent",
      },
    ],
  },
  {
    strict: false,
    toJSON: {
      transform: function (doc, ret) {
        if (ret.Dependent && ret.Dependent.length === 0) {
          delete ret.Dependent;
        }
      },
    },
  }
);

caseSchema.pre("save", function (next) {
  if (!this.Dependent || this.Dependent.length === 0) {
    delete this.Dependent;
  }
  next();
});

caseSchema.pre("save", function (next) {
  if (!this.Box) {
    delete this.Box;
  }
  next();
});

const Case = mongoose.model("Case", caseSchema);

module.exports = Case;
