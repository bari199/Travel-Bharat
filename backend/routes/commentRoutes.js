import express from "express";

import {
    addComment,
    getComments,
    replyComment,
    deleteComment
} from "../controllers/commentController.js";

import { isAuthenticated }
from "../middleware/isAuthenticated.js";

const router = express.Router();



router.post(
    "/",
    isAuthenticated,
    addComment
);



router.get(
    "/:destinationId",
    getComments
);



router.post(
    "/reply/:commentId",
    isAuthenticated,
    replyComment
);



router.delete(
    "/:commentId",
    isAuthenticated,
    deleteComment
);

export default router;