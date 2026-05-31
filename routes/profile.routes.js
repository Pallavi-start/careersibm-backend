const router = require("express").Router();

const upload = require("../middleware/multer");
const Profile = require("../models/profile.model");

const {
  updateProfile,
} = require("../controllers/profile.controller");

router.post(
  "/update-profile",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 },
    { name: "documents", maxCount: 10 },
  ]),
  updateProfile
);

const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD THIS
router.get("/profiles", getProfiles);

module.exports = router;