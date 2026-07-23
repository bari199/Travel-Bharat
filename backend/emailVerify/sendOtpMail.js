import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false, // Port 587
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendOtpMail = async (email, otp) => {
  const mailOptions = {
    from: `"Travel Bharat" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <h2>Travel Bharat</h2>
      <p>Your OTP for password reset is:</p>

      <h1 style="letter-spacing:4px;">${otp}</h1>

      <p>This OTP is valid for <b>10 minutes</b>.</p>

      <p>If you didn't request a password reset, please ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
