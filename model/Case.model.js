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
    dependent: [
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
  if (!this.dependent || this.dependent.length === 0) {
    delete this.dependent;
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
