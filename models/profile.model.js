const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  firstName: String,
  middleName: String,
  lastName: String,
  preferredName: String,

  phoneNumber: String,

  resume: String, // Cloudinary URL (PDF)
  coverLetter: String, // Cloudinary URL (PDF or text file)

  skills: [String],
  experience: String,
});

module.exports = mongoose.model("Profile", profileSchema);