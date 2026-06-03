import express from "express";

import {
  addComment,
  getComments,
  addReply,
  deleteComment
} from "../controllers/commentController.js";
import {isAuthenticated } from "../middleware/isAuthenticated.js";


const router = express.Router();

/* ADD COMMENT */
router.post("/:destinationId", isAuthenticated, addComment);

/* GET COMMENTS */
router.get("/:destinationId", getComments);

/* REPLY */
router.post("/reply/:commentId", isAuthenticated, addReply);

router.delete("/:commentId", isAuthenticated, deleteComment);

export default router;