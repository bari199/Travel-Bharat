import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import { Experience } from "../models/experienceModel.js";
import { Destination } from "../models/destination.js";

dotenv.config();

const syncExperiences = async () => {
  try {
    await connectDB();

    // পুরনো reference clear
    await Destination.updateMany({}, { $set: { bestExperiences: [] } });

    // সব experience আনো
    const experiences = await Experience.find().sort({
      destination: 1,
      createdAt: 1,
    });

    // destination + title track করবে
    const processed = new Set();

    let added = 0;
    let skipped = 0;

    for (const exp of experiences) {
      const key = `${exp.destination}_${exp.title.trim().toLowerCase()}`;

      if (processed.has(key)) {
        console.log(`⏭️ Duplicate skipped: ${exp.title}`);
        skipped++;
        continue;
      }

      processed.add(key);

      await Destination.findByIdAndUpdate(exp.destination, {
        $addToSet: {
          bestExperiences: exp._id,
        },
      });

      added++;
    }

    console.log("\n==============================");
    console.log(`✅ Added   : ${added}`);
    console.log(`⏭️ Skipped : ${skipped}`);
    console.log("==============================");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

syncExperiences();