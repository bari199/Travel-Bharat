import mongoose from "mongoose";

/**
 * One document per (user + comment) pair.
 * The unique compound index guarantees a user can never
 * have two rows for the same comment — upsert / findOneAndUpdate
 * leverage this at scale without race conditions.
 */
const reactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },

    type: {
      type: String,
      enum: ["like", "dislike"],
      required: true,
    },
  },
  { timestamps: true },
);

// Unique compound index — prevents duplicate rows and makes
// per-user lookups O(log n) even at 90k+ reactions.
reactionSchema.index({ user: 1, comment: 1 }, { unique: true });

// Fast aggregation queries (count likes/dislikes per comment)
reactionSchema.index({ comment: 1, type: 1 });

export const Reaction = mongoose.model("Reaction", reactionSchema);
