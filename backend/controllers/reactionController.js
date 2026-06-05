import mongoose from "mongoose";
import { Reaction } from "../models/reactionModel.js";

/**
 * Helper — returns { likes, dislikes, userReaction } for a single comment.
 */
const getCommentReactionData = async (commentId, userId = null) => {
  const [likes, dislikes, userRow] = await Promise.all([
    Reaction.countDocuments({ comment: commentId, type: "like" }),
    Reaction.countDocuments({ comment: commentId, type: "dislike" }),
    userId
      ? Reaction.findOne({ user: userId, comment: commentId }).lean()
      : Promise.resolve(null),
  ]);

  return {
    likes,
    dislikes,
    userReaction: userRow ? userRow.type : null,
  };
};

/*
|--------------------------------------------------------------------------
| GET STATS FOR ONE COMMENT  (public)
| GET /api/reactions/stats/:commentId
|--------------------------------------------------------------------------
*/
export const getCommentStats = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user?._id ?? null;

    const data = await getCommentReactionData(commentId, userId);

    return res.status(200).json({ success: true, ...data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/*
|--------------------------------------------------------------------------
| GET STATS FOR MULTIPLE COMMENTS AT ONCE  (batch)
| POST /api/reactions/stats/batch
| body: { commentIds: ["id1", "id2", ...] }
|--------------------------------------------------------------------------
*/
export const getBatchCommentStats = async (req, res) => {
  try {
    const { commentIds } = req.body;

    if (!Array.isArray(commentIds) || commentIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "commentIds array is required",
      });
    }

    const userId = req.user?._id ?? null;

    // Convert string IDs to ObjectIds — no dynamic import needed
    const objectIds = commentIds.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    const [aggregated, userReactions] = await Promise.all([
      // Single aggregation gets like + dislike counts for all comments
      Reaction.aggregate([
        { $match: { comment: { $in: objectIds } } },
        {
          $group: {
            _id: { comment: "$comment", type: "$type" },
            count: { $sum: 1 },
          },
        },
      ]),
      // Get this user's reactions for all comments (empty array if not logged in)
      userId
        ? Reaction.find({ user: userId, comment: { $in: objectIds } })
            .select("comment type")
            .lean()
        : Promise.resolve([]),
    ]);

    // Build map: commentId -> { likes, dislikes, userReaction }
    const statsMap = {};
    for (const id of commentIds) {
      statsMap[id] = { likes: 0, dislikes: 0, userReaction: null };
    }

    for (const row of aggregated) {
      const id = row._id.comment.toString();
      if (statsMap[id]) {
        if (row._id.type === "like") {
          statsMap[id].likes = row.count;
        } else {
          statsMap[id].dislikes = row.count;
        }
      }
    }

    for (const row of userReactions) {
      const id = row.comment.toString();
      if (statsMap[id]) {
        statsMap[id].userReaction = row.type;
      }
    }

    return res.status(200).json({ success: true, stats: statsMap });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/*
|--------------------------------------------------------------------------
| TOGGLE LIKE  (auth required)
| POST /api/reactions/like/:commentId
|
|  already liked    → remove like        (toggle off)
|  already disliked → switch to like
|  no reaction      → create like
|--------------------------------------------------------------------------
*/
export const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const existing = await Reaction.findOne({ user: userId, comment: commentId });

    if (existing?.type === "like") {
      // Toggle off
      await Reaction.deleteOne({ _id: existing._id });
    } else if (existing) {
      // Was dislike → switch to like
      existing.type = "like";
      await existing.save();
    } else {
      // No reaction yet → create like
      await Reaction.create({ user: userId, comment: commentId, type: "like" });
    }

    const data = await getCommentReactionData(commentId, userId);

    return res.status(200).json({ success: true, ...data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/*
|--------------------------------------------------------------------------
| TOGGLE DISLIKE  (auth required)
| POST /api/reactions/dislike/:commentId
|
|  already disliked → remove dislike     (toggle off)
|  already liked    → switch to dislike
|  no reaction      → create dislike
|--------------------------------------------------------------------------
*/
export const dislikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const existing = await Reaction.findOne({ user: userId, comment: commentId });

    if (existing?.type === "dislike") {
      await Reaction.deleteOne({ _id: existing._id });
    } else if (existing) {
      existing.type = "dislike";
      await existing.save();
    } else {
      await Reaction.create({ user: userId, comment: commentId, type: "dislike" });
    }

    const data = await getCommentReactionData(commentId, userId);

    return res.status(200).json({ success: true, ...data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
