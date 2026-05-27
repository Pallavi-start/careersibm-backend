const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const sendOtp = require("../utils/sendOtp");

exports.signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, country } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 1. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save user
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      country,
      otp,
      otpExpire: Date.now() + 10 * 60 * 1000,
      isVerified: false,
    });

    // 4. SEND OTP (THIS IS WHERE YOUR FILE IS USED 👇)
    await sendOtp(email, otp);

    res.json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};