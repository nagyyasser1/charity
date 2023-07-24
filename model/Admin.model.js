const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
    type: String,
    required: true,
    unique,
  },
  filed: {
    type: String,
    required: true,
    enum: ["mosque", "incubation", "general"],
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
