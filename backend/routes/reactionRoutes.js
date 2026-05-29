import express from "express";

import {

    likeDestination,

    dislikeDestination,

    shareDestination

} from "../controllers/reactionController.js";

import { isAuthenticated }
from "../middleware/isAuthenticated.js";

const router = express.Router();



router.post(
    "/like/:destinationId",
    isAuthenticated,
    likeDestination
);



router.post(
    "/dislike/:destinationId",
    isAuthenticated,
    dislikeDestination
);



router.post(
    "/share/:destinationId",
    shareDestination
);



export default router;