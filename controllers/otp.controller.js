// const User = require("../models/user.model");

// exports.verifyOtpUser = async (req, res) => {
//   const { email, otp } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) return res.status(404).json({ message: "User not found" });

//   if (user.otp !== otp || user.otpExpire < Date.now()) {
//     return res.status(400).json({ message: "Invalid OTP" });
//   }

//   user.isVerified = true;
//   user.otp = null;
//   user.otpExpire = null;

//   await user.save();

//   res.json({ message: "Verified" });
// };

const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

exports.verifyOtpUser = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ activate user
    user.isVerified = true;
    user.otp = null;
    user.otpExpire = null;
    await user.save();

    // 🔥 USE YOUR FUNCTION (IMPORTANT)
    const token = generateToken(user._id);

    res.json({
      message: "Verified successfully",
      token,
      user,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};