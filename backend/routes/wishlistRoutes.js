import express from "express";

import {

    addWishlist,

    getWishlist,

    removeWishlist

} from "../controllers/wishlistController.js";

import { isAuthenticated }
from "../middleware/isAuthenticated.js";

const router = express.Router();



router.post(
    "/",
    isAuthenticated,
    addWishlist
);



router.get(
    "/",
    isAuthenticated,
    getWishlist
);



router.delete(
    "/:wishlistId",
    isAuthenticated,
    removeWishlist
);



export default router;