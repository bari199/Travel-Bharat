import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
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

    category: {
      type: String,
      default: "",
    },

    eventDate: {
      type: Date,
    },

    startTime: {
      type: String,
      default: "",
    },

    endTime: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    organizer: {
      type: String,
      default: "",
    },

    ticketPrice: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model(
  "Event",
  eventSchema
);