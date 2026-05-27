// const mongoose = require("mongoose");

// const profileSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true,
//       index: true,
//     },

//     firstName: {
//       type: String,
//       trim: true,
//     },

//     middleName: {
//       type: String,
//       trim: true,
//     },

//     lastName: {
//       type: String,
//       trim: true,
//     },

//     preferredName: {
//       type: String,
//       trim: true,
//     },

//     email: {
//       type: String,
//       trim: true,
//       lowercase: true,
//     },

//     language: {
//       type: String,
//       default: "English",
//     },

//     coverLetter: {
//       type: String, // text OR Cloudinary URL
//     },

//     resume: {
//       type: String, // Cloudinary PDF URL
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Profile", profileSchema);