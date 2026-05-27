const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  country: String,

  isVerified: { type: Boolean, default: false },
  profileCompleted: { type: Boolean, default: false },

  otp: String,
  otpExpire: Date,
});

module.exports = mongoose.model("User", userSchema);