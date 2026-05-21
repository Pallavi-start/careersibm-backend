const nodemailer = require("nodemailer");

const sendOtp = async (email, otp) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: email,

    subject: "Your OTP Code",

    html: `
      <h2>Your OTP is:</h2>
      <h1>${otp}</h1>
    `,
  });

  
};

module.exports = sendOtp;