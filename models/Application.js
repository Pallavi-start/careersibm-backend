const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    skills: { type: String, required: true },
    experience: { type: String, required: true },
    resume: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);