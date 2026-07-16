import express from "express";

import {
  toggleExperienceWishlist,
  getExperienceWishlist,
  removeExperienceWishlist
} from "../controllers/experienceWishlistController.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post(
  "/:experienceId",
  isAuthenticated,
  toggleExperienceWishlist
);

router.get(
  "/",
  isAuthenticated,
  getExperienceWishlist
);

router.delete(
  "/:wishlistId",
  isAuthenticated,
  removeExperienceWishlist
);

export default router;