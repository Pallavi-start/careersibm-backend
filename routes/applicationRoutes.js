const express = require("express");
const router = express.Router();

const multer = require("multer");

const Application =
require("../models/Application");

// ================= STORAGE =================
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }

});

const upload = multer({ storage });

// ================= APPLY ROUTE =================
router.post(
  "/apply",

  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "documents", maxCount: 10 }
  ]),

  async (req, res) => {

    try {

      const {
        fullName,
        email,
        phone,
        address,
        skills,
        experience
      } = req.body;

      const resume =
        req.files["resume"]
          ? req.files["resume"][0].filename
          : "";

      const documents =
        req.files["documents"]
          ? req.files["documents"].map(
              file => file.filename
            )
          : [];

      const newApplication =
      new Application({

        fullName,
        email,
        phone,
        address,
        skills,
        experience,

        resume,
        documents

      });

      await newApplication.save();

      res.status(201).json({
        success: true,
        message:
        "Application Submitted Successfully"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Submission Failed"
      });
    }
});

// ================= GET ALL APPLICATIONS =================
router.get("/", async (req, res) => {

  try {

    const applications =
      await Application.find();

    res.status(200).json(applications);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch applications"
    });
  }
});

module.exports = router;