import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import { Experience } from "../models/experienceModel.js";
import { Destination } from "../models/destination.js";

dotenv.config();

const syncExperiences = async () => {
  try {
    await connectDB();

    // Optional: পুরনো reference মুছে দাও
    await Destination.updateMany(
      {},
      { $set: { bestExperiences: [] } }
    );

    const experiences = await Experience.find();

    for (const exp of experiences) {
      await Destination.findByIdAndUpdate(
        exp.destination,
        {
          $addToSet: {
            bestExperiences: exp._id,
          },
        }
      );
    }

    console.log("✅ Experiences synced successfully.");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

syncExperiences();