// const express = require("express");
// const router = express.Router();

// const jwt = require("jsonwebtoken");
// const otpGenerator = require("otp-generator");

// const User = require("../models/User");
// const sendOtp = require("../utils/sendOtp");


// // SEND OTP
// router.post("/send-otp", async (req, res) => {

//   try {

//     const { email } = req.body;

//     const otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       lowerCaseAlphabets: false,
//       specialChars: false,
//     });

//     let user = await User.findOne({ email });

//     if (!user) {

//       user = new User({
//         email,
//         otp,
//       });

//     } else {

//       user.otp = otp;

//     }

//     await user.save();

//     await sendOtp(email, otp);

//     res.json({
//       success: true,
//       message: "OTP Sent",
//     });

//   } catch (error) {

//     res.status(500).json({
//       error: error.message,
//     });

//   }
// });


// // VERIFY OTP
// router.post("/verify-otp", async (req, res) => {

//   try {

//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({
//         message: "User not found",
//       });
//     }

//     if (user.otp !== otp) {
//       return res.status(400).json({
//         message: "Invalid OTP",
//       });
//     }

//     user.verified = true;

//     await user.save();

//     const token = jwt.sign(
//       {
//         userId: user._id,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "7d",
//       }
//     );

//     res.json({
//       success: true,
//       token,
//     });

//   } catch (error) {

//     res.status(500).json({
//       error: error.message,
//     });

//   }
// });

// module.exports = router;