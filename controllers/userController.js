// const User = require("../models/User");

// const otpGenerator = require("otp-generator");

// const jwt = require("jsonwebtoken");

// const sendOtp = require("../utils/sendOtp");


// // SEND OTP
// exports.sendOTP = async (req, res) => {
//   try {

//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         message: "Email required",
//       });
//     }

//     const otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       lowerCaseAlphabets: false,
//       specialChars: false,
//     });

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({
//         email,
//       });
//     }

//     user.otp = otp;

//     user.otpExpire = Date.now() + 5 * 60 * 1000;

//     await user.save();

//     await sendOtp(email, otp);

//     res.status(200).json({
//       success: true,
//       message: "OTP sent successfully",
//     });

//   } catch (err) {

//     console.log(err);

//     res.status(500).json({
//       message: "Server Error",
//     });
//   }
// };


// // VERIFY OTP
// exports.verifyOTP = async (req, res) => {
//   try {

//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     if (user.otp !== otp) {
//       return res.status(400).json({
//         message: "Invalid OTP",
//       });
//     }

//     if (user.otpExpire < Date.now()) {
//       return res.status(400).json({
//         message: "OTP expired",
//       });
//     }

//     user.verified = true;

//     await user.save();

//     const token = jwt.sign(
//       {
//         id: user._id,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "7d",
//       }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login Successful",
//       token,
//       user,
//     });

//   } catch (err) {

//     console.log(err);

//     res.status(500).json({
//       message: "Server Error",
//     });
//   }
// };