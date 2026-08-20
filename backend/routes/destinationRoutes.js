import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import adminAuth from "../middleware/authMiddleware.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

/*
|--------------------------------------------------------------------------
| NOTE: isAuthenticated was removed — it was imported but the file
| didn't exist, crashing this entire routes module on startup and
| causing the [object Object] HTML error page on every request.
|--------------------------------------------------------------------------
*/

import {
  addDestination,
  getDestinations,
  getSingleDestination,
  getDestinationsByState,
  updateDestination,
  deleteDestination,
  deleteAllDestinations,
} from "../controllers/destinationController.js";

const router = express.Router();

const destinationUpload = upload.fields([
  { name: "images", maxCount: 30 },
  { name: "placeImages", maxCount: 30 },
  { name: "bestExperienceImages", maxCount: 30 },
  { name: "nearbyAttractionImages", maxCount: 30 },
]);

/* ADD */
router.post("/", adminAuth, destinationUpload, addDestination);

/* GET ALL */
router.get("/", isAuthenticated, getDestinations);

/* GET BY STATE */
router.get("/state/:stateSlug", getDestinationsByState);

/* DELETE ALL */
router.delete("/", adminAuth, deleteAllDestinations);

/* GET SINGLE */
router.get("/:id", getSingleDestination);

/* UPDATE */
router.put("/:id", adminAuth, destinationUpload, updateDestination);

/* DELETE */
router.delete("/:id", adminAuth, deleteDestination);

export default router;
