const mongoose = require("mongoose");

const researcherSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: string,
    required: true,
    unique: true,
  },
  phone: [
    {
      type: Number,
      max: 11,
      min: 11,
      required: true,
      unique: true,
    },
  ],
  available: {
    type: Boolean,
    required: true,
  },
});

const Researcher = mongoose.model("Researcher", researcherSchema);

module.exports = Researcher;
