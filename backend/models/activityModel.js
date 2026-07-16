import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    // Relationship
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },

    // Basic Information
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
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

    // Classification
    category: {
      type: String,
      enum: [
        "Adventure",
        "Nature",
        "Wildlife",
        "Water Sports",
        "Snow",
        "Camping",
        "Trekking",
        "Spiritual",
        "Cultural",
        "Photography",
        "Family",
        "Sightseeing",
      ],
      required: true,
    },

    activityType: {
      type: String,
      enum: ["Outdoor", "Indoor", "Guided", "Self Guided", "Group", "Private"],
      default: "Outdoor",
    },

    // Activity Details
    duration: {
      type: String,
      default: "",
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Hard", "Challenging", "Difficult", "Expert"],
      default: "Easy",
    },

    location: {
      type: String,
      default: "",
    },

    meetingPoint: {
      type: String,
      default: "",
    },

    openingHours: {
      type: String,
      default: "",
    },

    // Visitor Information
    price: {
      type: Number,
      default: 0,
    },

    minimumAge: {
      type: Number,
      default: 0,
    },

    maximumAge: {
      type: Number,
      default: 100,
    },

    fitnessLevel: {
      type: String,
      enum: ["Beginner", "Average", "Intermediate", "Advanced", "Professional"],
      default: "Basic",
    },

    bestTime: {
      type: String,
      default: "",
    },

    // Lists
    thingsToCarry: [
      {
        type: String,
      },
    ],

    equipmentProvided: [
      {
        type: String,
      },
    ],

    safetyTips: [
      {
        type: String,
      },
    ],

    shares: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    highlights: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Activity = mongoose.model("Activity", activitySchema);
