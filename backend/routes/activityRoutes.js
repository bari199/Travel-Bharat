import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import adminAuth from "../middleware/authMiddleware.js";

import {
  addActivity,
  getActivities,
  getSingleActivity,
  getActivitiesByDestination,
  updateActivity,
  deleteActivity,
} from "../controllers/activityController.js";

const router = express.Router();

/* ADD */
router.post(
  "/",
  adminAuth,
  upload.fields([
    {
      name: "images",
      maxCount: 20,
    },
  ]),
  addActivity
);

/* GET ALL */
router.get("/", getActivities);

/* GET BY DESTINATION */
router.get(
  "/destination/:destinationId",
  getActivitiesByDestination
);

/* GET SINGLE */
router.get("/:id", getSingleActivity);

/* UPDATE */
router.put(
  "/:id",
  adminAuth,
  upload.fields([
    {
      name: "images",
      maxCount: 20,
    },
  ]),
  updateActivity
);

/* DELETE */
router.delete("/:id", adminAuth, deleteActivity);

export default router;