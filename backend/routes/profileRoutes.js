import express from "express";

import {
  getProfile,
  updateProfile,
  getUserReviews,
  getUserRatings,
  getUserStats,
} from "../controllers/profileController.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get(
  "/",
  isAuthenticated,
  getProfile
);

router.put(
  "/",
  isAuthenticated,
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

router.get(
  "/stats",
  isAuthenticated,
  getUserStats
);

export default router;