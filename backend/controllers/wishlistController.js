import { Wishlist } from "../models/wishlistModel.js";



/* =========================================
   ADD TO WISHLIST
========================================= */

export const addWishlist = async(req,res)=>{

    try {

        const {destinationId} = req.body;

        if(!destinationId){

            return res.status(400).json({
                success:false,
                message:"Destination ID is required"
            });

        }



        /* CHECK EXISTING */

        const existingWishlist = await Wishlist.findOne({

            user:req.userId,

            destination:destinationId

        });



        if(existingWishlist){

            return res.status(400).json({

                success:false,

                message:"Already added to wishlist"

            });

        }



        const wishlist = await Wishlist.create({

            user:req.userId,

            destination:destinationId

        });



        return res.status(201).json({

            success:true,

            message:"Added to wishlist",

            wishlist

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};





/* =========================================
   GET USER WISHLIST
========================================= */

export const getWishlist = async(req,res)=>{

    try {

        const wishlist = await Wishlist.find({

            user:req.userId

        }).populate("destination");



        return res.status(200).json({

            success:true,

            total:wishlist.length,

            wishlist

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};





/* =========================================
   REMOVE WISHLIST
========================================= */

export const removeWishlist = async(req,res)=>{

    try {

        const {wishlistId} = req.params;



        const wishlist = await Wishlist.findById(wishlistId);

        if(!wishlist){

            return res.status(404).json({

                success:false,

                message:"Wishlist item not found"

            });

        }



        await Wishlist.findByIdAndDelete(wishlistId);



        return res.status(200).json({

            success:true,

            message:"Removed from wishlist"

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};