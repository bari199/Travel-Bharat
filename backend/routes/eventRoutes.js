import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import adminAuth from "../middleware/authMiddleware.js";

import {
  addEvent,
  getEvents,
  getSingleEvent,
  getEventsByDestination,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

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
  addEvent
);

/* GET ALL */
router.get("/", getEvents);

/* GET BY DESTINATION */
router.get(
  "/destination/:destinationId",
  getEventsByDestination
);

/* GET SINGLE */
router.get("/:id", getSingleEvent);

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
  updateEvent
);

/* DELETE */
router.delete("/:id", adminAuth, deleteEvent);

export default router;