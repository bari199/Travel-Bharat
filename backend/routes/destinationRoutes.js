import express from "express";

import {

  addDestination,

  deleteDestination,

  getBestExperiences,

  getDestinations,

  getSingleDestination,

  updateDestination,

} from "../controllers/destinationController.js";

import { authMiddleware }
from "../middleware/authMiddleware.js";

import upload
from "../middleware/uploadMiddleware.js";

const router = express.Router();



/*
|--------------------------------------------------------------------------
| BEST EXPERIENCES
|--------------------------------------------------------------------------
*/
router.get(
  "/best/experiences",
  getBestExperiences
);



/*
|--------------------------------------------------------------------------
| GET ALL DESTINATIONS
|--------------------------------------------------------------------------
*/
router.get(
  "/",
  getDestinations
);



/*
|--------------------------------------------------------------------------
| GET SINGLE DESTINATION
|--------------------------------------------------------------------------
*/
router.get(
  "/:id",
  getSingleDestination
);





/*
|--------------------------------------------------------------------------
| ADD DESTINATION
|--------------------------------------------------------------------------
*/
router.post(

  "/",

  authMiddleware,

  upload.fields([

    {
      name: "images",
      maxCount: 5,
    },

    {
      name: "placeImages",
      maxCount: 5,
    },

    {
      name: "experienceCardImage",
      maxCount: 1,
    },

  ]),

  addDestination

);






/*
|--------------------------------------------------------------------------
| UPDATE DESTINATION
|--------------------------------------------------------------------------
*/
router.put(

  "/:id",

  authMiddleware,

  upload.fields([

    {
      name: "images",
      maxCount: 5,
    },

    {
      name: "placeImages",
      maxCount: 5,
    },

    {
      name: "experienceCardImage",
      maxCount: 1,
    },

  ]),

  updateDestination

);






/*
|--------------------------------------------------------------------------
| DELETE DESTINATION
|--------------------------------------------------------------------------
*/
router.delete(

  "/:id",

  authMiddleware,

  deleteDestination

);


export default router;
