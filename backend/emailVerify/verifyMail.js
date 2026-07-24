import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const verifyMail = async (token, email) => {
  const templateSource = fs.readFileSync(
    path.join(__dirname, "template.hbs"),
    "utf8"
  );

  const template = handlebars.compile(templateSource);

  const html = template({
    token: encodeURIComponent(token),
    frontendUrl: process.env.FRONTEND_URL,
  });

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
      subject: "Verify Your Email",
      htmlContent: html,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    throw new Error(data.message || "Brevo Email Failed");
  }

  console.log("✅ Verification Email Sent");
}