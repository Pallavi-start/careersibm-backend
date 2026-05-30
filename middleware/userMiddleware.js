// const { protect } = require("./userMiddleware");

// // user must be logged in
// const userOnly = (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json({ message: "User not logged in" });
//   }
//   next();
// };

// // optional: profile must be completed
// const profileCompletedOnly = (req, res, next) => {
//   if (!req.user.profileCompleted) {
//     // return res.status(403).json({
//       message: "Complete profile first",
//     });
//   }
//   next();
// };

// module.exports = {
//   userOnly,
//   profileCompletedOnly,
// };