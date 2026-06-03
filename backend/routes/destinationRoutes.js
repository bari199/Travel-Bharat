import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  addDestination,
  getDestinations,
  getSingleDestination,
  updateDestination,
  deleteDestination,
} from "../controllers/destinationController.js";

const router = express.Router();

/* ADD */
router.post(
  "/",
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
    {
      name: "placeImages",
      maxCount: 10,
    },
    {
      name: "experienceCardImage",
      maxCount: 10,
    },
  ]),
  addDestination
);

/* GET ALL */
router.get("/", getDestinations);

/* SINGLE */
router.get("/:id", getSingleDestination);

/* UPDATE */
router.put(
  "/:id",
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
    {
      name: "placeImages",
      maxCount: 10,
    },
    {
      name: "experienceCardImage",
      maxCount: 10,
    },
  ]),
  updateDestination
);

/* DELETE */
router.delete("/:id", deleteDestination);

export default router;