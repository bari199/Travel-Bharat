import express from "express";

import {
  getProfile,
  updateProfile,
  getUserReviews,
  getUserRatings,
  getUserStats,
  updatePassword,
} from "../controllers/profileController.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();

router.get(
  "/",
  isAuthenticated,
  getProfile
);

router.put(
  "/",
  isAuthenticated,
  upload.single("avatar"),
  updateProfile
);

router.get(
  "/reviews",
  isAuthenticated,
  getUserReviews
);

router.get(
  "/ratings",
  isAuthenticated,
  getUserRatings
);

router.put(
  "/change-password",
  isAuthenticated,
  updatePassword
);

router.get(
  "/stats",
  isAuthenticated,
  getUserStats
);

export default router;