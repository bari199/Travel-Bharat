import express from "express";

import {

    addRating,

    getRatings

} from "../controllers/ratingController.js";

import { isAuthenticated }
from "../middleware/isAuthenticated.js";

const router = express.Router();



router.post(
    "/",
    isAuthenticated,
    addRating
);



router.get(
    "/:destinationId",
    getRatings
);



export default router;