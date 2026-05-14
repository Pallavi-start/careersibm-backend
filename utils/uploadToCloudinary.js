const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadToCloudinary = (fileBuffer, folder = "resumes") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.on("error", reject);
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

module.exports = uploadToCloudinary;