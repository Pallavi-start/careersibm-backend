// const Profile = require("../models/Profile");

// // CREATE OR UPDATE PROFILE
// exports.createProfile = async (req, res) => {
//   try {
//     const {
//       firstName,
//       middleName,
//       lastName,
//       preferredName,
//       email,
//       language,
//       coverLetter,
//       resume,
//     } = req.body;

//     const userId = req.user.userId; // ✅ FIXED

//     let profile = await Profile.findOne({ userId });

//     if (profile) {
//       profile = await Profile.findOneAndUpdate(
//         { userId },
//         {
//           firstName,
//           middleName,
//           lastName,
//           preferredName,
//           email,
//           language,
//           coverLetter,
//           resume,
//         },
//         { new: true }
//       );
//     } else {
//       profile = await Profile.create({
//         userId,
//         firstName,
//         middleName,
//         lastName,
//         preferredName,
//         email,
//         language,
//         coverLetter,
//         resume,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       profile,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // GET PROFILE
// exports.getProfile = async (req, res) => {
//   try {

//     const userId = req.user.userId; // ✅ FIXED

//     const profile = await Profile.findOne({ userId });

//     res.status(200).json({
//       success: true,
//       profile,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };