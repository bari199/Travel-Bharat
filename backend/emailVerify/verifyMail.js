import nodemailer from "nodemailer";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create transporter once
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false, // Port 587
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const verifyMail = async (token, email) => {
  const emailTemplateSource = fs.readFileSync(
    path.join(__dirname, "template.hbs"),
    "utf-8"
  );

  const template = handlebars.compile(emailTemplateSource);

  const htmlToSend = template({
    token: encodeURIComponent(token),
    frontendUrl: process.env.FRONTEND_URL,
  });

  const mailConfigurations = {
    from: `"Travel Bharat" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Email Verification",
    html: htmlToSend,
  };

  try {
    const info = await transporter.sendMail(mailConfigurations);

    console.log("✅ Email sent successfully");
    console.log(info.messageId);
  } catch (error) {
    console.error("❌ Email send failed:", error);
    throw error;
  }
};