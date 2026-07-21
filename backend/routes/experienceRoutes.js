import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import adminAuth from "../middleware/authMiddleware.js";

import {
  addExperience,
  getExperiences,
  getSingleExperience,
  getExperienceNavbar,
  getExperiencesByDestination,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

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
  addExperience,
);

/* GET ALL */
router.get("/", getExperiences);
router.get("/navbar", getExperienceNavbar);

/* GET BY DESTINATION */
router.get("/destination/:destinationId", getExperiencesByDestination);

/* GET SINGLE */
router.get("/:id", getSingleExperience);

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
  updateExperience,
);


/* DELETE */
router.delete("/:id", adminAuth, deleteExperience);

export default router;
