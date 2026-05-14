const express = require("express");
const router = express.Router();
const multer = require("multer");
const Application = require("../models/Application");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

// memory storage (IMPORTANT for Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// APPLY ROUTE
router.post(
  "/apply",
  upload.single("resume"),
  async (req, res) => {
    try {
      const { fullName, email, phone, skills, experience } = req.body;

      let resumeUrl = "";

      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, "resumes");
        resumeUrl = result.secure_url;
      }

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
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Upload failed" });
    }
  }
);

module.exports = router;