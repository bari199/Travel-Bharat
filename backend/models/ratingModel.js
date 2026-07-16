import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  },
);

/* =========================================
   PREVENT DUPLICATE RATING
========================================= */

ratingSchema.index(
  {
    user: 1,
    destination: 1,
  },
  {
    unique: true,
  },
);

export const Rating = mongoose.model("Rating", ratingSchema);
