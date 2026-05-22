const nodemailer = require("nodemailer");

const sendOtp = async (email, otp) => {

  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },

      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,

      subject: "Your OTP Code",

      html: `
        <h2>Your OTP is:</h2>
        <h1>${otp}</h1>
      `,
    });

    console.log("OTP Email Sent");

  } catch (error) {

    console.log("Mail Error:", error);

    throw new Error("Email sending failed");
  }
};

module.exports = sendOtp;