import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      default: "",
    },
    public_id: {
      type: String,
      default: "",
    },
  },
  { _id: false },
);

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

    images: {
      type: [imageSchema],
      default: [],
    },

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
    },
  },
  {
    timestamps: true,
  },
);

export const Experience = mongoose.model("Experience", experienceSchema);
