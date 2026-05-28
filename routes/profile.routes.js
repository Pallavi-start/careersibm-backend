const router = require("express").Router();

const upload = require("../middleware/upload");

const {
  updateProfile,
} = require("../controllers/profile.controller");

router.post(
  "/update-profile",

  upload.fields([
    {
      name: "resume",
      maxCount: 1,
    },

    {
      name: "coverLetter",
      maxCount: 1,
    },

    {
      name: "documents",
      maxCount: 10,
    },
  ]),

  updateProfile
);

module.exports = router;