import express from "express";

import adminAuth from "../middleware/authMiddleware.js";

import {
  getAllUsers,
  deleteUser,
  getDashboardStats,
  getAdminProfile,
  getAllComments,
  deleteAdminComment,
  getAllRatings,
  deleteRating,
  getAllWishlist,
  deleteWishlistAdmin,
  getAllReactions,
  deleteReaction,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", adminAuth, getAllUsers);
router.get("/dashboard", adminAuth, getDashboardStats);
router.get("/profile", adminAuth, getAdminProfile);
router.delete("/users/:id", adminAuth, deleteUser);
router.get("/comments", adminAuth, getAllComments);
router.delete("/comments/:id", adminAuth, deleteAdminComment);
router.get("/ratings", adminAuth, getAllRatings);
router.delete("/ratings/:id", adminAuth, deleteRating);
router.get("/wishlist", adminAuth, getAllWishlist);
router.delete("/wishlist/:id", adminAuth, deleteWishlistAdmin);
router.get("/reactions", adminAuth, getAllReactions);
router.delete("/reactions/:id", adminAuth, deleteReaction);

export default router;
