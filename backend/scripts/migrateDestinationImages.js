import "dotenv/config";

import connectDB from "../config/db.js";
import { Destination } from "../models/destination.js";


async function migrateImages() {
  try {
    console.log("\n🚀 Starting Image Migration...\n");

    await connectDB();


    const destinations = await Destination.find({});

    let updated = 0;
    let skipped = 0;


    for (const destination of destinations) {

      let changed = false;


      // images migration
      if (
        Array.isArray(destination.images) &&
        destination.images.length > 0 &&
        typeof destination.images[0] === "string"
      ) {

        destination.images = destination.images.map((url) => ({
          url,
          public_id: "",
        }));

        changed = true;
      }



      // placeImages migration
      if (
        Array.isArray(destination.placeImages) &&
        destination.placeImages.length > 0 &&
        typeof destination.placeImages[0] === "string"
      ) {

        destination.placeImages = destination.placeImages.map((url) => ({
          url,
          public_id: "",
        }));

        changed = true;
      }



      // nearby attractions image migration
      if (Array.isArray(destination.nearbyAttractions)) {

        destination.nearbyAttractions =
          destination.nearbyAttractions.map((item) => {


            if (
              typeof item.image === "string"
            ) {

              item.image = {
                url: item.image,
                public_id: "",
              };

              changed = true;
            }


            return item;

          });

      }



      if (changed) {

        await destination.save();

        updated++;

        console.log(`✅ Updated: ${destination.name}`);

      } else {

        skipped++;

      }

    }



    console.log("\n==============================");
    console.log(" Migration Completed");
    console.log("==============================");
    console.log(`Updated : ${updated}`);
    console.log(`Skipped : ${skipped}`);
    console.log("==============================\n");


    process.exit(0);


  } catch (error) {

    console.error("\n❌ Migration Error");
    console.error(error);

    process.exit(1);

  }
}



migrateImages();