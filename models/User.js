const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
  },

  otp: String,

  googleId: String,

  verified: {
    type: Boolean,
    default: false,
  },

});

module.exports = mongoose.model("User", userSchema);