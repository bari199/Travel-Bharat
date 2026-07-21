import mongoose from "mongoose";

import connectDB from "../config/db.js";
import { Destination } from "../models/destination.js";

import { normalizeName } from "./helpers.js";

/* ===========================================================
   DESTINATION CACHE
=========================================================== */

const destinationCache = new Map();

/* ===========================================================
   CONNECT DATABASE
=========================================================== */

export async function initializeDatabase() {

    await connectDB();

    console.log("✓ MongoDB Connected");

}

/* ===========================================================
   LOAD DESTINATIONS
=========================================================== */

export async function loadDestinations() {

    const destinations = await Destination.find({});

    destinationCache.clear();

    for (const destination of destinations) {

        destinationCache.set(

            normalizeName(destination.name),

            destination

        );

    }

    console.log(
        `✓ Loaded ${destinationCache.size} destinations into memory`
    );

}

/* ===========================================================
   FIND DESTINATION
=========================================================== */

export function findDestination(name) {

    return destinationCache.get(

        normalizeName(name)

    );

}

/* ===========================================================
   UPDATE HERO IMAGES
=========================================================== */

export async function saveHeroImages(

    destination,

    images

) {

    destination.images = images;

    await destination.save();

}

/* ===========================================================
   GET TOTAL DESTINATIONS
=========================================================== */

export function totalDestinations() {

    return destinationCache.size;

}

/* ===========================================================
   GET ALL DESTINATIONS
=========================================================== */

export function getDestinationCache() {

    return destinationCache;

}

/* ===========================================================
   CLOSE DATABASE
=========================================================== */

export async function closeDatabase() {

    await mongoose.connection.close();

    console.log("✓ MongoDB Connection Closed");

}