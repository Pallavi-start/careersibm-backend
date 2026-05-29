const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer, folder, originalname) => {
  const nameWithoutExt = originalname
    .split(".")
    .slice(0, -1)
    .join("_")
    .replace(/\s/g, "_")
    .replace(/[()]/g, "");

  const ext = originalname.split(".").pop();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,

        // IMPORTANT for PDFs
        resource_type: "auto",

        // keeps filename
        public_id: nameWithoutExt,

        // VERY IMPORTANT (fixes extension issues)
        format: ext,

        use_filename: true,
        unique_filename: false,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = uploadToCloudinary;