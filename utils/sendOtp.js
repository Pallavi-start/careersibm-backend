const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendOtp = async (email, otp) => {

  try {

    const client = SibApiV3Sdk.ApiClient.instance;

    client.authentications["api-key"].apiKey =
      process.env.BREVO_API_KEY;

    const apiInstance =
      new SibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail = {

      sender: {
        email: "pshirbhate1999@gmail.com",
        name: "CareersIBM",
      },

      to: [
        {
          email: email,
        },
      ],

      subject: "Your OTP Verification Code",

      htmlContent: `
        <div style="font-family:sans-serif;padding:20px;">
          
          <h2>CareersIBM Login OTP</h2>

          <p>Your OTP code is:</p>

          <h1 style="letter-spacing:4px;">
            ${otp}
          </h1>

          <p>
            This OTP will expire soon.
          </p>

        </div>
      `,
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("OTP Email Sent");

  } catch (error) {

    console.log("Mail Error:", error);

    throw new Error("Email sending failed");
  }
};

module.exports = sendOtp;

