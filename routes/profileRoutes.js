const express = require("express");
const router = express.Router();

const Profile = require("../models/Profile");
const auth = require("../middleware/userMiddleware");


// CREATE PROFILE
router.post("/", auth, async (req, res) => {

  try {

    const existing = await Profile.findOne({
      userId: req.user.userId
    });

    if (existing) {
      return res.status(400).json({
        message: "Profile already exists",
      });
    }

    const profile = new Profile({
      ...req.body,
      userId: req.user.userId,
    });

    await profile.save();

    res.json({
      success: true,
      message: "Profile created",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});


// CHECK PROFILE
router.get("/me", auth, async (req, res) => {

  try {

    const profile = await Profile.findOne({
      userId: req.user.userId,
    });

    res.json({
      exists: !!profile,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});

module.exports = router;