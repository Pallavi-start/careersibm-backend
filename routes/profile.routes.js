const router = require("express").Router();
const multer = require("multer");
const { updateProfile } = require("../controllers/profile.controller");

const upload = multer({ dest: "uploads/" });

router.post(
  "/update-profile",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 },
  ]),
  updateProfile
);

module.exports = router;