import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    duration: {
      type: String,
      default: "",
    },
    distance: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    bestTime: {
      type: String,
      default: "",
    },
    priceRange: {
      type: String,
      default: "",
    },
    difficultyLevel: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
     highlights: {
      type: [String],
      default: [],
    },
    tips: {
      type: [String],
      default: [],
    }
  },
  {
    timestamps: true,
  },
);

export const Experience = mongoose.model("Experience", experienceSchema);
