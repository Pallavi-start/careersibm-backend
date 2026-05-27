const Profile = require("../models/profile.model");
const User = require("../models/user.model");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

exports.updateProfile = async (req, res) => {
  try {
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    const {
      userId,
      firstName,
      middleName,
      lastName,
      preferredName,
      phoneNumber,
      coverLetterText,
      skills,
      experience,
    } = req.body;

    let resumeUrl = "";
    let coverLetterUrl = "";

    // ✅ Resume upload
    if (req.file) {
      const result = await uploadToCloudinary(req.file.path, {
        folder: "ibm-resumes",
        resource_type: "auto",
      });

      resumeUrl = result.secure_url;
    }

    // ✅ Cover letter file upload (optional second file)
    if (req.files?.coverLetter?.[0]) {
      const result = await uploadToCloudinary(
        req.files.coverLetter[0].path,
        {
          folder: "ibm-coverletters",
          resource_type: "auto",
        }
      );

      coverLetterUrl = result.secure_url;
    }

    // ✅ skills handling (IMPORTANT FIX)
    let skillsArray = [];
    if (skills) {
      skillsArray =
        typeof skills === "string" ? skills.split(",") : skills;
    }

    await Profile.findOneAndUpdate(
      { userId },
      {
        firstName,
        middleName,
        lastName,
        preferredName,
        phoneNumber,

        resume: resumeUrl,
        coverLetter: coverLetterUrl || coverLetterText,

        skills: skillsArray,
        experience,
      },
      { upsert: true, new: true }
    );

    await User.findByIdAndUpdate(userId, {
      profileCompleted: true,
    });

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.log("PROFILE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};