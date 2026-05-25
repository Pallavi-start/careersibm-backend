const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  fullName: String,
  phone: String,
  address: String,
  education: String,
  skills: String,
  language: String,

});

module.exports = mongoose.model("Profile", profileSchema);