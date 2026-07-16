import mongoose from "mongoose";

const activityWishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    activity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

activityWishlistSchema.index(
  {
    user: 1,
    activity: 1,
  },
  {
    unique: true,
  }
);

export const ActivityWishlist =
  mongoose.model(
    "ActivityWishlist",
    activityWishlistSchema
  );