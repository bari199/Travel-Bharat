import express from "express";
import {
  likeComment,
  dislikeComment,
  getCommentStats,
  getBatchCommentStats,
} from "../controllers/reactionController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

// Batch stats (used by frontend after comments load) — optional auth for userReaction
router.post("/stats/batch", isAuthenticated, getBatchCommentStats);

// Single comment stats
router.get("/stats/:commentId", getCommentStats);

// Toggle like / dislike — auth required
router.post("/like/:commentId", isAuthenticated, likeComment);
router.post("/dislike/:commentId", isAuthenticated, dislikeComment);

export default router;
