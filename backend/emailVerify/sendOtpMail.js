import * as brevo from "@getbrevo/brevo";
import "dotenv/config";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sendOtpMail = async (email, otp) => {
  try {
    const emailData = {
      sender: {
        name: "Travel Bharat",
        email: process.env.MAIL_USER,
      },

      to: [
        {
          email,
        },
      ],

      subject: "Password Reset OTP",

      htmlContent: `
        <h2>Travel Bharat</h2>

        <p>Your OTP for password reset is:</p>

        <h1 style="letter-spacing:5px;">
          ${otp}
        </h1>

        <p>
          This OTP is valid for <b>10 minutes</b>.
        </p>

        <p>
          If you didn't request this, please ignore this email.
        </p>
      `,
    };

    const response = await apiInstance.sendTransacEmail(emailData);

    console.log("=================================");
    console.log("✅ OTP Email Sent");
    console.log(response);
    console.log("=================================");
  } catch (error) {
    console.log("=================================");
    console.log("❌ OTP Email Failed");
    console.error(error);
    console.log("=================================");

    throw error;
  }
};