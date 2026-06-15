import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import adminAuth from "../middleware/authMiddleware.js";

import {
  addDestination,
  getDestinations,
  getSingleDestination,
  getDestinationsByState,
  updateDestination,
  deleteDestination,
} from "../controllers/destinationController.js";

const router = express.Router();

/* ADD */
router.post(
  "/",
  adminAuth,
  upload.fields([
    {
      name: "images",
      maxCount: 30,
    },
    {
      name: "placeImages",
      maxCount: 30,
    },
    {
      name: "bestExperienceImages",
      maxCount: 30,
    },
    {
      name: "nearbyAttractionImages",
      maxCount: 30,
    },
  ]),
  addDestination,
);

/* GET ALL */
router.get("/", getDestinations);

/* SINGLE */
router.get("/:id", getSingleDestination);

/* UPDATE */
router.put(
  "/:id",
  adminAuth,
  upload.fields([
    {
      name: "images",
      maxCount: 30,
    },
    {
      name: "placeImages",
      maxCount: 30,
    },
    {
      name: "bestExperienceImages",
      maxCount: 30,
    },
    {
      name: "nearbyAttractionImages",
      maxCount: 30,
    },
  ]),
  updateDestination,
);

router.get(
  "/state/:stateSlug",
  getDestinationsByState
);

/* DELETE */
router.delete("/:id", adminAuth, deleteDestination);

export default router;
