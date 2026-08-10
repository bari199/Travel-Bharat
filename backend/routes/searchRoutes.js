import express from "express";

import {
  searchDestination,
  getSearchOptions,
} from "../controllers/searchController.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

/*
 * Search destinations
 */
router.post("/", isAuthenticated, searchDestination);

/*
 * Get State / City / Category
 * directly from MongoDB
 */
router.get("/options", isAuthenticated, getSearchOptions);

export default router;