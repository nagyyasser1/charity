const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    ssh: {
      type: Number,
      unique: true,
      required: true,
    },
    document: {
      type: [String],
      required: false,
    },
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
  },
  { strict: false }
);

caseSchema.pre("save", function (next) {
  if (!this.document || this.document.length === 0) {
    this.document = undefined;
  }
  next();
});

caseSchema.pre("save", function (next) {
  if (!this.dependent || this.dependent.length === 0) {
    this.dependent = undefined;
  }
  next();
});

caseSchema.pre("save", function (next) {
  if (!this.researchOpinions || this.researchOpinions.length === 0) {
    this.researchOpinions = undefined;
  }
  next();
});

const Case = mongoose.model("Caseeee", caseSchema);

module.exports = Case;

// const mongoose = require("mongoose");

// const caseSchema = new mongoose.Schema(
//   {
//     // midname: {
//     //   type: String,
//     // },
//     // lastname: {
//     //   type: String,
//     // },
//     // status: {
//     //   type: String,
//     //   enum: ["poor", "widows", "orphans"],
//     // },
//     // sponsor: {
//     //   type: String,
//     //   enum: ["factory", "special", "foundation"],
//     // },
//     // deserve: {
//     //   type: String,
//     //   enum: ["yes", "no", "wating"],
//     // },
//     // phone: {
//     //   type: [Number],
//     // },
//     // salary: {
//     //   type: Number,
//     // },
//     // box: {
//     //   type: Number,
//     //   default: 1,
//     // },
//     // checkDate: {
//     //   type: Date,
//     // },
//     // startDate: {
//     //   type: Date,
//     // },
//     // birthdate: {
//     //   type: Date,
//     // },
//     // description: {
//     //   type: String,
//     // },
//     // town: {
//     //   type: String,
//     // },
//     // street: {
//     //   type: String,
//     // },
//     ssh:{
//       type:Number,
//       unique:true

//     },
//     document: {
//       // required: function () {
//       //   return typeof this.sponsor !== "undefined";
//       // },
//       type: [String],
//       required: false,
//     },
//     dependent: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Dependent",
//       },
//     ],
//     researchOpinions: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "ResearchOpinion",
//       },
//     ],
//   },
//   { strict: false }
// );

// caseSchema.pre("save", function (next) {
//   if (!this.document || this.document.length === 0) {
//     this.document = undefined;
//   }
//   next();
// });

// caseSchema.pre("save", function (next) {
//   if (!this.dependent || this.dependent.length === 0) {
//     this.dependent = undefined;
//   }
//   next();
// });

// caseSchema.pre("save", function (next) {
//   if (!this.researchOpinions || this.researchOpinions.length === 0) {
//     this.researchOpinions = undefined;
//   }
//   next();
// });

// const Case = mongoose.model("Case", caseSchema);

// module.exports = Case;
