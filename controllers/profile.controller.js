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
      email, 
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

    const existingProfile =
  await Profile.findOne({ userId });
   const updatedProfile =
  await Profile.findOneAndUpdate(
      { userId },

     {
  firstName:
    firstName ||
    existingProfile?.firstName,

  middleName:
    middleName ||
    existingProfile?.middleName,

  lastName:
    lastName ||
    existingProfile?.lastName,

  preferredName:
    preferredName ||
    existingProfile?.preferredName,

  phoneNumber:
    phoneNumber ||
    existingProfile?.phoneNumber,
email:
  email ||
  existingProfile?.email,
  state:
    state ||
    existingProfile?.state,

  city:
    city ||
    existingProfile?.city,

  addressLine1:
    addressLine1 ||
    existingProfile?.addressLine1,

  addressLine2:
    addressLine2 ||
    existingProfile?.addressLine2,

  zipCode:
    zipCode ||
    existingProfile?.zipCode,

  website:
    website ||
    existingProfile?.website,

  resume:
    resumeUrl ||
    existingProfile?.resume,

  coverLetter:
    coverLetterUrl ||
    existingProfile?.coverLetter,

  documents:
    uploadedDocuments.length > 0
      ? uploadedDocuments
      : existingProfile?.documents || [],

  skills:
    skillsArray.length > 0
      ? skillsArray
      : existingProfile?.skills || [],

  experience:
    experience ||
    existingProfile?.experience,

  workHistory:
    workHistory
      ? JSON.parse(workHistory)
      : existingProfile?.workHistory || [],

  educationHistory:
    educationHistory
      ? JSON.parse(
          educationHistory
        )
      : existingProfile?.educationHistory || [],

  languages:
    languages
      ? JSON.parse(languages)
      : existingProfile?.languages || [],
     },

      {
        upsert: true,
        new: true,
      }
    );

   
    await User.findByIdAndUpdate(
      userId,
      {
        profileCompleted: true,
      }
    );

    res.json({
  message:
    "Profile updated successfully",
  profile: updatedProfile,
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