import { Destination } from "../models/destination.js";



/* =========================================
   LIKE DESTINATION
========================================= */

export const likeDestination = async(req,res)=>{

    try {

        const {destinationId} = req.params;

        const destination = await Destination.findById(destinationId);

        if(!destination){

            return res.status(404).json({
                success:false,
                message:"Destination not found"
            });

        }



        const userId = req.userId.toString();



        /* REMOVE DISLIKE */

        destination.dislikes =
        destination.dislikes.filter(

            id => id.toString() !== userId

        );



        /* CHECK LIKE */

        const alreadyLiked =
        destination.likes.some(

            id => id.toString() === userId

        );



        if(alreadyLiked){

            destination.likes =
            destination.likes.filter(

                id => id.toString() !== userId

            );

        } else {

            destination.likes.push(userId);

        }



        await destination.save();



        return res.status(200).json({

            success:true,

            totalLikes:destination.likes.length,

            totalDislikes:destination.dislikes.length,

            message:alreadyLiked
            ? "Like removed"
            : "Liked successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};





/* =========================================
   DISLIKE DESTINATION
========================================= */

export const dislikeDestination = async(req,res)=>{

    try {

        const {destinationId} = req.params;

        const destination = await Destination.findById(destinationId);

        if(!destination){

            return res.status(404).json({
                success:false,
                message:"Destination not found"
            });

        }



        const userId = req.userId.toString();



        /* REMOVE LIKE */

        destination.likes =
        destination.likes.filter(

            id => id.toString() !== userId

        );



        /* CHECK DISLIKE */

        const alreadyDisliked =
        destination.dislikes.some(

            id => id.toString() === userId

        );



        if(alreadyDisliked){

            destination.dislikes =
            destination.dislikes.filter(

                id => id.toString() !== userId

            );

        } else {

            destination.dislikes.push(userId);

        }



        await destination.save();



        return res.status(200).json({

            success:true,

            totalLikes:destination.likes.length,

            totalDislikes:destination.dislikes.length,

            message:alreadyDisliked
            ? "Dislike removed"
            : "Disliked successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};





/* =========================================
   SHARE DESTINATION
========================================= */

export const shareDestination = async(req,res)=>{

    try {

        const {destinationId} = req.params;

        const destination = await Destination.findById(destinationId);

        if(!destination){

            return res.status(404).json({
                success:false,
                message:"Destination not found"
            });

        }



        destination.shares += 1;

        await destination.save();



        return res.status(200).json({

            success:true,

            totalShares:destination.shares,

            message:"Destination shared"

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};