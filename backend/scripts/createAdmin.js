import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import prompts from "prompts";

import connectDB from "../config/db.js";
import { Admin } from "../models/adminModel.js";

dotenv.config();

const createAdmin = async () => {
  try {
    console.clear();
    console.log("==================================");
    console.log("   Travel Bharat Admin Creator");
    console.log("==================================\n");

    // Connect Database
    await connectDB();

    // Email Input
    const { email } = await prompts({
      type: "text",
      name: "email",
      message: "Admin Email:",
      validate: (value) => {
        if (!value.trim()) return "Email is required.";
        return true;
      },
    });

    if (!email) {
      console.log("\nOperation cancelled.");
      process.exit(0);
    }

    // Password Input
    const { password } = await prompts({
      type: "password",
      name: "password",
      message: "Admin Password:",
      validate: (value) => {
        if (!value) return "Password is required.";
        if (value.length < 6)
          return "Password must be at least 6 characters.";
        return true;
      },
    });

    if (!password) {
      console.log("\nOperation cancelled.");
      process.exit(0);
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Duplicate Check
    const existingAdmin = await Admin.findOne({
      email: normalizedEmail,
    });

    if (existingAdmin) {
      console.log("\n❌ Admin already exists.");
      process.exit(0);
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Admin
    const admin = await Admin.create({
      email: normalizedEmail,
      password: hashedPassword,
    });

    console.log("\n✅ Admin created successfully.\n");

    console.table([
      {
        ID: admin._id.toString(),
        Email: admin.email,
      },
    ]);

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Failed to create admin.");
    console.error(error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

createAdmin();