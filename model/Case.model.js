const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    SSH: {
      type: Number,
      unique: true,
      required: true,
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

const Case = mongoose.model("Case", caseSchema);

module.exports = Case;
