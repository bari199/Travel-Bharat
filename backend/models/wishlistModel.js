import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    destination:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Destination",
        required:true
    }

},{
    timestamps:true
});



/* =========================================
   PREVENT DUPLICATE WISHLIST
========================================= */

wishlistSchema.index(
    {
        user:1,
        destination:1
    },
    {
        unique:true
    }
);



export const Wishlist = mongoose.model(
    "Wishlist",
    wishlistSchema
);