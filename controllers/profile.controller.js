const Profile = require("../models/profile.model");

const User = require("../models/user.model");

const uploadToCloudinary = require(
  "../utils/uploadToCloudinary"
);

exports.updateProfile = async (
  req,
  res
) => {
  try {

    console.log("FILES:", req.files);

    console.log("BODY:", req.body);

    const {
      userId,

      firstName,
      middleName,
      lastName,
      preferredName,

      phoneNumber,

      skills,
      experience,

      // ADDRESS
      state,
      city,
      addressLine1,
      addressLine2,
      zipCode,
      website,

      // ARRAY DATA
      workHistory,
      educationHistory,
      languages,
    } = req.body;

    let resumeUrl = "";

    let coverLetterUrl = "";

    // ============================
    // RESUME
    // ============================
    if (req.files?.resume?.[0]) {

     const result =
 await uploadToCloudinary(
  req.files.resume[0].buffer,
  "ibm-resumes",
  req.files.resume[0].originalname
);

      resumeUrl = result.secure_url;
    }

    // ============================
    // COVER LETTER
    // ============================
    if (
      req.files?.coverLetter?.[0]
    ) {

     const result =
 await uploadToCloudinary(
  req.files.coverLetter[0].buffer,
  "ibm-coverletters",
  req.files.coverLetter[0].originalname
);

      coverLetterUrl =
        result.secure_url;
    }

    // ============================
    // EXTRA DOCUMENTS
    // ============================
    let uploadedDocuments = [];

    if (req.files?.documents) {

      for (
        let i = 0;
        i < req.files.documents.length;
        i++
      ) {

        const file =
          req.files.documents[i];

       const result =
  await uploadToCloudinary(
  file.buffer,
  "ibm-documents",
  file.originalname
);

        uploadedDocuments.push({
          name:
            file.originalname,
          fileUrl:
            result.secure_url,
        });
      }
    }

    // ============================
    // SKILLS
    // ============================
    let skillsArray = [];

    if (skills) {

      skillsArray =
        typeof skills ===
        "string"
          ? skills
              .split(",")
              .map((skill) =>
                skill.trim()
              )
          : skills;
    }

    // ============================
    // UPDATE PROFILE
    // ============================
    await Profile.findOneAndUpdate(
      { userId },

      {
        // BASIC INFO
        firstName,
        middleName,
        lastName,
        preferredName,

        phoneNumber,

        // ADDRESS
        state,
        city,
        addressLine1,
        addressLine2,
        zipCode,
        website,

        // FILES
        resume: resumeUrl,
        coverLetter:
          coverLetterUrl,

        documents:
          uploadedDocuments,

        // OTHER
        skills: skillsArray,
        experience,

        // ARRAY DATA
        workHistory:
          workHistory
            ? JSON.parse(
                workHistory
              )
            : [],

        educationHistory:
          educationHistory
            ? JSON.parse(
                educationHistory
              )
            : [],

        languages: languages
          ? JSON.parse(
              languages
            )
          : [],
      },

      {
        upsert: true,
        new: true,
      }
    );

    // ============================
    // USER PROFILE COMPLETE
    // ============================
    await User.findByIdAndUpdate(
      userId,
      {
        profileCompleted: true,
      }
    );

    res.json({
      message:
        "Profile updated successfully",
    });

  } catch (error) {

    console.log(
      "PROFILE ERROR:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });
  }
};