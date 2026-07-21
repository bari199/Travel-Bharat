import "dotenv/config";

import mongoose from "mongoose";
import connectDB from "../config/db.js";


async function fixMigration() {

  try {

    await connectDB();

    const collection =
      mongoose.connection.collection("destinations");


    let updated = 0;


    const cursor = collection.find({});


    while(await cursor.hasNext()) {

      const doc = await cursor.next();

      let update = {};
      let changed = false;


      if(
        Array.isArray(doc.images) &&
        typeof doc.images[0] === "string"
      ){

        update.images = doc.images.map(url => ({
          url,
          public_id:""
        }));

        changed = true;
      }


      if(
        Array.isArray(doc.placeImages) &&
        typeof doc.placeImages[0] === "string"
      ){

        update.placeImages = doc.placeImages.map(url => ({
          url,
          public_id:""
        }));

        changed = true;
      }



      if(Array.isArray(doc.nearbyAttractions)){

        const attractions =
          doc.nearbyAttractions.map(item=>{

            if(typeof item.image==="string"){

              return {
                ...item,
                image:{
                  url:item.image,
                  public_id:""
                }
              };

            }

            return item;

          });


        if(JSON.stringify(attractions)!==
           JSON.stringify(doc.nearbyAttractions)){

          update.nearbyAttractions = attractions;

          changed=true;
        }

      }



      if(changed){

        await collection.updateOne(
          {_id:doc._id},
          {$set:update}
        );


        updated++;

        console.log("Fixed:",doc.name);

      }

    }



    console.log("\n=================");
    console.log("DONE");
    console.log("Updated:",updated);
    console.log("=================");


    process.exit(0);


  }catch(err){

    console.log(err);
    process.exit(1);

  }

}


fixMigration();