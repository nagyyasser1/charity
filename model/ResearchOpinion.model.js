const mongoose = require("mongoose");

const researchOpinionSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case",
    require: true,
  },
  researcher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Researcher",
    require: true,
  },
  opinion: {
    type: String,
    require: true,
  },
});

const ResearchOpinion = mongoose.model(
  "ResearchOpinion",
  researchOpinionSchema
);

module.exports = ResearchOpinion;
