import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    username: String,

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const commentSchema = new mongoose.Schema(
  {
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    username: String,

    message: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    dislikesCount: {
      type: Number,
      default: 0,
    },

    replies: [replySchema],
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model(
  "Comment",
  commentSchema
);