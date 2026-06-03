import express from "express";

import { searchDestination } from "../controllers/searchController.js";

import {isAuthenticated} from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/", isAuthenticated, searchDestination);

export default router;
