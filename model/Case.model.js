const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    ssh: {
      type: Number,
      unique: true,
      required: true,
    },
    box: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Box",
    },
  },
  {
    strict: false,
    toJSON: {
      transform: function (doc, ret) {
        if (ret.dependent && ret.dependent.length === 0) {
          delete ret.dependent;
        }
      },
    },
  }
);

caseSchema.pre("save", function (next) {
  if (!this.dependents || this.dependents.length === 0) {
    delete this.dependents;
  }
  next();
});

caseSchema.pre("save", function (next) {
  if (!this.box) {
    delete this.Box;
  }
  next();
});

const Case = mongoose.model("Case", caseSchema);

module.exports = Case;
