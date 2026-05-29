import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    bestTimeToVisit: {
      type: String,
      required: true,
    },
    entryFee: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    nearbyAttraction: {
      type: String,
    },

    attractionDetails: {
      type: String,
    },

    placeImages: [
      {
        type: String,
      },
    ],

    bestImages:[
      {
        type: String,
      }
    ],

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    shares: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

export const Destination = mongoose.model("Destination", destinationSchema);
