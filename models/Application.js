const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  skills: String,
  experience: String,
  resume: String, // ✅ Cloudinary URL
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Application", applicationSchema);