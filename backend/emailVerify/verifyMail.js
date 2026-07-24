import * as brevo from "@getbrevo/brevo";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import handlebars from "handlebars";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const verifyMail = async (token, email) => {
  try {
    const templateSource = fs.readFileSync(
      path.join(__dirname, "template.hbs"),
      "utf8"
    );

    const template = handlebars.compile(templateSource);

    const html = template({
      token: encodeURIComponent(token),
      frontendUrl: process.env.FRONTEND_URL,
    });

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
      subject: "Verify Your Email",
      htmlContent: html,
    };

    const response = await apiInstance.sendTransacEmail(emailData);

    console.log("✅ Verification Email Sent");
    console.log(response);

  } catch (err) {
    console.error("❌ Brevo API Error");
    console.error(err);

    throw err;
  }
};