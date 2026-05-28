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

  // ADDRESS
  state: String,
  city: String,
  addressLine1: String,
  addressLine2: String,
  zipCode: String,
  website: String,

  // FILES
  resume: String,
  coverLetter: String,

  // EXTRA DOCUMENTS
  documents: [
    {
      name: String,
      fileUrl: String,
    },
  ],

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

module.exports = mongoose.model(
  "Profile",
  profileSchema
);