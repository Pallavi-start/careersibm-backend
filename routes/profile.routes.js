// const router = require("express").Router();

// const upload = require("../middleware/multer");
// const Profile = require("../models/profile.model");
// const auth = require("../middleware/auth");
// const adminAuth = require("../middleware/adminAuth");

// const {
//   updateProfile,
// } = require("../controllers/profile.controller");

// router.post(
//   "/update-profile",
//   upload.fields([
//     { name: "resume", maxCount: 1 },
//     { name: "coverLetter", maxCount: 1 },
//     { name: "documents", maxCount: 10 },
//   ]),
//   updateProfile
// );

// const getProfiles = async (req, res) => {
//   try {
//     const profiles = await Profile.find();
//     res.json(profiles);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // ADD THIS
// router.get("/profiles", getProfiles);
// router.get("/get-profile", auth, getProfile);
// module.exports = router;
const router = require("express").Router();

const upload = require("../middleware/multer");
const auth = require("../middleware/authMiddleware");

const {
  updateProfile,
  getProfile,
   getProfiles
} = require("../controllers/profile.controller");

router.post(
  "/update-profile",
  auth,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 },
    { name: "documents", maxCount: 10 },
  ]),
  updateProfile
);

router.get("/get-profile", auth, getProfile);



module.exports = router;