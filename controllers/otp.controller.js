const User = require("../models/user.model");

exports.verifyOtpUser = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.otp !== otp || user.otpExpire < Date.now()) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpire = null;

  await user.save();

  res.json({ message: "Verified" });
};