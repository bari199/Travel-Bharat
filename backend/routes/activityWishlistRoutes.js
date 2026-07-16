import express from "express";

import {
  toggleActivityWishlist,
  getActivityWishlist,
   removeActivityWishlist,
} from "../controllers/activityWishlistController.js";

import { isAuthenticated }
from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post(
  "/:activityId",
  isAuthenticated,
  toggleActivityWishlist
);

router.get(
  "/",
  isAuthenticated,
  getActivityWishlist
);

router.delete(
  "/:wishlistId",
  isAuthenticated,
  removeActivityWishlist
);

export default router;