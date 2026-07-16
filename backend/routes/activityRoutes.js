import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import adminAuth from "../middleware/authMiddleware.js";

import {
  addActivity,
  getActivities,
  getSingleActivity,
  getActivityBySlug,
  getActivitiesByDestination,
  updateActivity,
  deleteActivity,
} from "../controllers/activityController.js";

const router = express.Router();

router.get("/", getActivities);

router.get("/destination/:destinationId", getActivitiesByDestination);

router.get("/slug/:slug", getActivityBySlug);

router.get("/:id", getSingleActivity);

router.put("/:id", adminAuth, upload.fields([
  {
    name: "images",
    maxCount: 20,
  },
]), updateActivity);

router.delete("/:id", adminAuth, deleteActivity);

export default router;
