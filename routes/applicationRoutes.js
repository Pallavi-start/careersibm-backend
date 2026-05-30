const express = require("express");
const router = express.Router();
const multer = require("multer");
const Application = require("../models/Application");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

// Memory storage (Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// APPLY
router.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    const { fullName, email, phone, skills, experience } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({
        error: "Required fields missing",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "Resume file is required",
      });
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      "resumes",
      req.file.originalname
    );

    const resumeUrl = result.secure_url;

    const newApp = new Application({
      fullName,
      email,
      phone,
      skills,
      experience,
      resume: resumeUrl,
    });

    await newApp.save();

    res.status(201).json({
      success: true,
      message: "Application submitted",
      data: newApp,
    });

  } catch (err) {
    console.error("APPLICATION ERROR:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// GET ALL APPLICATIONS
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

module.exports = router;