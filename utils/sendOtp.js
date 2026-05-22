const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendOtp = async (email, otp) => {

  try {

    const client = SibApiV3Sdk.ApiClient.instance;

    client.authentications["api-key"].apiKey =
      process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail = {
      sender: {
        email: "pshirbhate1999@gmail.com",
        name: "OTP Verification",
      },

      to: [
        {
          email: email,
        },
      ],

      subject: "Your OTP Code",

      htmlContent: `
        <h2>Your OTP is:</h2>
        <h1>${otp}</h1>
      `,
    };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("Email Sent:", data);

  } catch (error) {

    console.log("Mail Error:", error);

    throw new Error("Email sending failed");
  }
};

module.exports = sendOtp;