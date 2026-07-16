import mongoose from "mongoose";

const experienceWishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    experience: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experience",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

experienceWishlistSchema.index(
  {
    user: 1,
    experience: 1,
  },
  {
    unique: true,
  }
);

export const ExperienceWishlist = mongoose.model(
  "ExperienceWishlist",
  experienceWishlistSchema
);