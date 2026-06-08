const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // BASIC INFO
  firstName: String,
  middleName: String,
  lastName: String,
  preferredName: String,

  phoneNumber: String,
  email: String,
  // ADDRESS
  state: String,
  city: String,
  addressLine1: String,
  addressLine2: String,
  zipCode: String,
  website: String,

  // FILES
 documents: [
    {
      name: String,
      fileUrl: String,
    },
  ],

  resume: String,
  coverLetter: String,

  // SKILLS
  skills: [String],
 
  // EXPERIENCE
  experience: String,

  // WORK HISTORY
  workHistory: [
    {
      company: String,
      positionTitle: String,
      currentPosition: String,
      startDate: String,
    },
  ],

  // EDUCATION
  educationHistory: [
    {
      degreeName: String,
      degreeType: String,
      university: String,
      startDate: String,
      endDate: String,
    },
  ],

  // LANGUAGES
  languages: [
    {
      language: String,
      writtenLevel: String,
      spokenLevel: String,
    },
  ],
});
profileSchema.index({ userId: 1 }, { unique: true });
module.exports = mongoose.model(
  "Profile",
  profileSchema
);