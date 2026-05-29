import express from "express";

import {
    addState,
    getStates
} from "../controllers/stateController.js";


import { authMiddleware } from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), addState);

router.get("/", authMiddleware, getStates);

export default router;