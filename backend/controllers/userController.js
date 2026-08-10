import { sendOtpMail } from "../emailVerify/sendOtpMail.js";
import { verifyMail } from "../emailVerify/verifyMail.js";
import { Session } from "../models/sessionModel.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ==========================================================
   REGISTER USER
========================================================== */

export const registerUser = async (req, res) => {
  console.log("\n========================================");
  console.log("🚀 REGISTER API CALLED");
  console.log("========================================");

  try {
    const { username, email, password } = req.body;

    console.log("📥 Request Body:", {
      username,
      email,
      passwordLength: password?.length,
    });

    if (!username || !email || !password) {
      console.log("❌ Missing Required Fields");

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log("🔍 Checking Existing User...");

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("❌ User Already Exists:", email);

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    console.log("🔐 Hashing Password...");

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("👤 Creating User...");

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log("✅ User Created");
    console.log("User ID:", newUser._id);

    console.log("🎫 Generating Verification Token...");

    const token = jwt.sign(
      { id: newUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "10m" }
    );

    console.log("✅ Token Generated");

    newUser.token = token;

    await newUser.save();

    console.log("💾 Token Saved In Database");

    console.log("📧 Sending Verification Email...");

    try {
      await verifyMail(token, email);

      console.log("✅ Verification Email Sent Successfully");
    } catch (mailError) {
      console.log("========================================");
      console.log("❌ EMAIL SEND FAILED");
      console.log("========================================");

      console.error(mailError);

      console.log("Message :", mailError.message);
      console.log("Code :", mailError.code);
      console.log("Command :", mailError.command);
      console.log("Response :", mailError.response);
      console.log("ResponseCode :", mailError.responseCode);

      return res.status(500).json({
        success: false,
        message: "Verification Email Failed",
        error: mailError.message,
      });
    }

    console.log("🎉 Registration Successful");

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.log("========================================");
    console.log("❌ REGISTER ERROR");
    console.log("========================================");

    console.error(error);
    console.log("Message :", error.message);
    console.log("Stack :", error.stack);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================================
   EMAIL VERIFICATION
========================================================== */

export const verification = async (req, res) => {
  console.log("\n========================================");
  console.log("📨 EMAIL VERIFICATION API");
  console.log("========================================");

  try {
    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ Missing Authorization Header");

      return res.status(401).json({
        success: false,
        message: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token Received");

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);

      console.log("✅ Token Verified");
      console.log(decoded);

    } catch (err) {

      console.log("❌ JWT Verification Failed");
      console.log(err.message);

      if (err.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "The registration token has expired",
        });
      }

      return res.status(400).json({
        success: false,
        message: "Token verification failed",
      });
    }

    console.log("🔍 Finding User...");

    const user = await User.findById(decoded.id);

    if (!user) {
      console.log("❌ User Not Found");

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.token = null;
    user.isVerified = true;

    await user.save();

    console.log("✅ User Verified Successfully");

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });

  } catch (error) {

    console.log("❌ Verification Error");

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const resendVerificationMail = async (req, res) => {
  try {
    console.log("======================================");
    console.log("📩 RESEND VERIFICATION EMAIL");
    console.log("======================================");

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    console.log("🎫 Generating New Token...");

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "100d" }
    );

    user.token = token;
    await user.save();

    console.log("✅ Token Saved");

    await verifyMail(token, user.email);

    console.log("✅ Verification Email Sent Again");

    return res.status(200).json({
      success: true,
      message: "Verification email sent successfully",
    });

  } catch (error) {
    console.log("======================================");
    console.log("❌ RESEND EMAIL FAILED");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ==========================================================
   LOGIN
========================================================== */

export const loginUser = async (req, res) => {

  console.log("\n========================================");
  console.log("🔐 LOGIN API");
  console.log("========================================");

  try {

    const { email, password } = req.body;

    console.log("Login Email:", email);

    if (!email || !password) {

      console.log("❌ Missing Login Fields");

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log("🔍 Finding User...");

    const user = await User.findOne({ email });

    if (!user) {

      console.log("❌ User Not Found");

      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    console.log("🔑 Comparing Password...");

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {

      console.log("❌ Wrong Password");

      return res.status(402).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    console.log("📧 Email Verified ?", user.isVerified);

    if (user.isVerified !== true) {

      console.log("❌ Email Not Verified");

      return res.status(403).json({
        success: false,
        message: "Verify your account than login",
      });
    }

    console.log("🗑 Removing Old Session...");

    const existingSession = await Session.findOne({
      userId: user._id,
    });

    if (existingSession) {
      await Session.deleteOne({
        userId: user._id,
      });

      console.log("✅ Previous Session Deleted");
    }

    console.log("➕ Creating New Session...");

    await Session.create({
      userId: user._id,
    });

    console.log("🎫 Generating Access Token...");

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "100d" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "300d" }
    );

    user.isLoggedIn = true;

    await user.save();

    console.log("✅ Login Successful");

    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.username}`,
      accessToken,
      refreshToken,
      user,
    });

  } catch (error) {

    console.log("❌ LOGIN ERROR");

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================================
   LOGOUT USER
========================================================== */

export const logoutUser = async (req, res) => {
  console.log("\n========================================");
  console.log("🚪 LOGOUT API");
  console.log("========================================");

  try {
    const userId = req.userId;

    console.log("👤 User ID:", userId);

    console.log("🗑 Deleting Sessions...");

    const result = await Session.deleteMany({ userId });

    console.log("Deleted Sessions:", result.deletedCount);

    console.log("🔄 Updating User Login Status...");

    await User.findByIdAndUpdate(userId, {
      isLoggedIn: false,
    });

    console.log("✅ Logout Successful");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {

    console.log("❌ LOGOUT ERROR");

    console.error(error);
    console.log("Message:", error.message);
    console.log("Stack:", error.stack);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ==========================================================
   FORGOT PASSWORD
========================================================== */

export const forgotPassword = async (req, res) => {

  console.log("\n========================================");
  console.log("🔐 FORGOT PASSWORD API");
  console.log("========================================");

  try {

    const { email } = req.body;

    console.log("📧 Email:", email);

    const user = await User.findOne({ email });

    if (!user) {

      console.log("❌ User Not Found");

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("👤 User Found");

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expiry = new Date(
      Date.now() + 10 * 60 * 1000
    );

    console.log("Generated OTP:", otp);
    console.log("Expiry:", expiry);

    user.otp = otp;
    user.otpExpiry = expiry;

    await user.save();

    console.log("💾 OTP Saved");

    console.log("📤 Sending OTP Mail...");

    try {

      await sendOtpMail(email, otp);

      console.log("✅ OTP Email Sent");

    } catch (mailError) {

      console.log("❌ OTP EMAIL ERROR");

      console.error(mailError);

      console.log("Message:", mailError.message);
      console.log("Code:", mailError.code);
      console.log("Command:", mailError.command);
      console.log("Response:", mailError.response);
      console.log("ResponseCode:", mailError.responseCode);

      return res.status(500).json({
        success: false,
        message: "OTP Email Failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {

    console.log("❌ FORGOT PASSWORD ERROR");

    console.error(error);
    console.log("Message:", error.message);
    console.log("Stack:", error.stack);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ==========================================================
   VERIFY OTP
========================================================== */

export const verifyOTP = async (req, res) => {

  console.log("\n========================================");
  console.log("🔢 VERIFY OTP API");
  console.log("========================================");

  try {

    const { otp } = req.body;
    const email = req.params.email;

    console.log("Email:", email);
    console.log("OTP:", otp);

    if (!otp) {

      console.log("❌ OTP Missing");

      return res.status(400).json({
        success: false,
        message: "OTP is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {

      console.log("❌ User Not Found");

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.otp || !user.otpExpiry) {

      console.log("❌ OTP Not Generated");

      return res.status(400).json({
        success: false,
        message: "OTP not generated or already verified",
      });
    }

    if (user.otpExpiry < new Date()) {

      console.log("❌ OTP Expired");

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one",
      });
    }

    if (otp !== user.otp) {

      console.log("❌ Invalid OTP");

      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    console.log("✅ OTP Verified Successfully");

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (error) {

    console.log("❌ VERIFY OTP ERROR");

    console.error(error);
    console.log("Message:", error.message);
    console.log("Stack:", error.stack);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


/* ==========================================================
   CHANGE PASSWORD
========================================================== */

export const changePassword = async (req, res) => {

  console.log("\n========================================");
  console.log("🔑 CHANGE PASSWORD API");
  console.log("========================================");

  try {

    const { newPassword, confirmPassword } = req.body;
    const email = req.params.email;

    console.log("Email:", email);

    if (!newPassword || !confirmPassword) {

      console.log("❌ Missing Password Fields");

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {

      console.log("❌ Passwords Do Not Match");

      return res.status(400).json({
        success: false,
        message: "Password do not match",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {

      console.log("❌ User Not Found");

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("🔐 Hashing New Password...");

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    console.log("✅ Password Changed Successfully");

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {

    console.log("❌ CHANGE PASSWORD ERROR");

    console.error(error);
    console.log("Message:", error.message);
    console.log("Stack:", error.stack);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};