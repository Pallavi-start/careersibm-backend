
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
   const existingProfile = await Profile.findOne({ userId });

let resumeUrl = existingProfile?.resume;
let coverLetterUrl = existingProfile?.coverLetter;
let uploadedDocuments = existingProfile?.documents || [];
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

    if (req.files?.documents?.length) {
  const newDocs = [];

  for (let file of req.files.documents) {
    const result = await uploadToCloudinary(
      file.buffer,
      "ibm-documents",
      file.originalname
    );

    newDocs.push({
      name: file.originalname,
      fileUrl: result.secure_url,
    });
  }

  uploadedDocuments = [...uploadedDocuments, ...newDocs];
}

 const skillsArray =
  skills !== undefined && skills !== null && skills !== ""
    ? typeof skills === "string"
      ? skills.split(",").map(s => s.trim()).filter(Boolean)
      : skills
    : existingProfile?.skills || [];

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId },
      {
       $set: {
  firstName: firstName ?? existingProfile?.firstName,
  middleName: middleName ?? existingProfile?.middleName,
  lastName: lastName ?? existingProfile?.lastName,
  preferredName: preferredName ?? existingProfile?.preferredName,

  phoneNumber: phoneNumber ?? existingProfile?.phoneNumber,
  

  state: state ?? existingProfile?.state,
  city: city ?? existingProfile?.city,
  addressLine1: addressLine1 ?? existingProfile?.addressLine1,
  addressLine2: addressLine2 ?? existingProfile?.addressLine2,
  zipCode: zipCode ?? existingProfile?.zipCode,
  website: website ?? existingProfile?.website,

  experience: experience ?? existingProfile?.experience,

  resume: resumeUrl ?? existingProfile?.resume,
  coverLetter: coverLetterUrl ?? existingProfile?.coverLetter,
 documents:
  req.files?.documents?.length
    ? uploadedDocuments
    : existingProfile?.documents || [],

  skills: skills !== undefined
  ? skillsArray
  : existingProfile?.skills || [],

  workHistory: workHistory
    ? JSON.parse(workHistory)
    : existingProfile?.workHistory || [],

  educationHistory: educationHistory
    ? JSON.parse(educationHistory)
    : existingProfile?.educationHistory || [],

  languages: languages
    ? JSON.parse(languages)
    : existingProfile?.languages || [],
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
        ...(profile
          ? {
              firstName: profile.firstName,
              middleName: profile.middleName,
              lastName: profile.lastName,
              preferredName: profile.preferredName,
              phoneNumber: profile.phoneNumber,
              skills: profile.skills,
              experience: profile.experience,
              state: profile.state,
              city: profile.city,
              addressLine1: profile.addressLine1,
              addressLine2: profile.addressLine2,
              zipCode: profile.zipCode,
              website: profile.website,
              workHistory: profile.workHistory,
              educationHistory: profile.educationHistory,
              languages: profile.languages,
              resume: profile.resume,
              coverLetter: profile.coverLetter,
              documents: profile.documents,
            }
          : {}),
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
// ================= GET ALL PROFILES (ADMIN) =================
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });

    const users = await User.find().lean();

    const merged = users.map((user) => {
      const profile = profiles.find(
        (p) => String(p.userId) === String(user._id)
      );

      return {
        ...user,
        ...(profile
          ? {
              firstName: profile.firstName,
              middleName: profile.middleName,
              lastName: profile.lastName,
              preferredName: profile.preferredName,
              phoneNumber: profile.phoneNumber,
              skills: profile.skills,
              experience: profile.experience,
              state: profile.state,
              city: profile.city,
              website: profile.website,
              workHistory: profile.workHistory,
              educationHistory: profile.educationHistory,
              languages: profile.languages,
              resume: profile.resume,
              coverLetter: profile.coverLetter,
              documents: profile.documents,
            }
          : {}),
      };
    });

    res.json(merged);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};