import express from "express";
import {
  addComment,
  getComments,
  addReply,
  deleteComment,
} from "../controllers/commentController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/:destinationId", isAuthenticated, addComment);
router.get("/:destinationId", getComments);
router.post("/reply/:commentId", isAuthenticated, addReply);
router.delete("/:commentId", isAuthenticated, deleteComment);

export default router;
