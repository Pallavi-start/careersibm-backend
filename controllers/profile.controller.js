
const Profile = require("../models/profile.model");
const User = require("../models/user.model");
const uploadToCloudinary = require("../utils/uploadToCloudinary");


// ================= UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      firstName,
      middleName,
      lastName,
      preferredName,
      email,
      phoneNumber,
      skills,
      experience,
      state,
      city,
      addressLine1,
      addressLine2,
      zipCode,
      website,
      workHistory,
      educationHistory,
      languages,
    } = req.body;

    // FILES
    let resumeUrl = "";
    let coverLetterUrl = "";
    let uploadedDocuments = [];

    if (req.files?.resume?.[0]) {
      const result = await uploadToCloudinary(
        req.files.resume[0].buffer,
        "ibm-resumes",
        req.files.resume[0].originalname
      );
      resumeUrl = result.secure_url;
    }

    if (req.files?.coverLetter?.[0]) {
      const result = await uploadToCloudinary(
        req.files.coverLetter[0].buffer,
        "ibm-coverletters",
        req.files.coverLetter[0].originalname
      );
      coverLetterUrl = result.secure_url;
    }

    if (req.files?.documents) {
      for (let file of req.files.documents) {
        const result = await uploadToCloudinary(
          file.buffer,
          "ibm-documents",
          file.originalname
        );

        uploadedDocuments.push({
          name: file.originalname,
          fileUrl: result.secure_url,
        });
      }
    }

    const skillsArray = skills
      ? typeof skills === "string"
        ? skills.split(",").map(s => s.trim())
        : skills
      : [];

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId },
      {
        $set: {
          firstName,
          middleName,
          lastName,
          preferredName,
          email,
          phoneNumber,
          state,
          city,
          addressLine1,
          addressLine2,
          zipCode,
          website,
          experience,
          resume: resumeUrl,
          coverLetter: coverLetterUrl,
          documents: uploadedDocuments,
          skills: skillsArray,
          workHistory: workHistory ? JSON.parse(workHistory) : [],
          educationHistory: educationHistory ? JSON.parse(educationHistory) : [],
          languages: languages ? JSON.parse(languages) : [],
        },
      },
      { upsert: true, new: true }
    );

    await User.findByIdAndUpdate(userId, {
      profileCompleted: true,
    });

    res.json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ================= GET PROFILE =================
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).lean();
    const profile = await Profile.findOne({ userId }).lean();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      user: {
        ...user,
        ...(profile || {}),
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};