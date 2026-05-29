import express from "express";

import { searchDestination } from "../controllers/searchController.js";

const router = express.Router();

router.post("/", searchDestination);

export default router;
