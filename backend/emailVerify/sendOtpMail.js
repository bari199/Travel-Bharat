import "dotenv/config";

export const sendOtpMail = async (email, otp) => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: "Travel Bharat",
        email: process.env.MAIL_USER,
      },
      to: [{ email }],
      subject: "Password Reset OTP",
      htmlContent: `
        <h2>Travel Bharat</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>Valid for 10 minutes.</p>
      `,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    throw new Error(data.message || "Brevo OTP Failed");
  }

  console.log("✅ OTP Email Sent");
}