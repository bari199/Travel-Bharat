import { Rating } from "../models/ratingModel.js";



/* =========================================
   ADD OR UPDATE RATING
========================================= */

export const addRating = async(req,res)=>{

    try {

        const {destinationId,rating} = req.body;

        if(!destinationId || !rating){

            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });

        }



        if(rating < 1 || rating > 5){

            return res.status(400).json({
                success:false,
                message:"Rating must be between 1 to 5"
            });

        }



        /* CHECK EXISTING RATING */

        let existingRating = await Rating.findOne({

            user:req.userId,

            destination:destinationId

        });



        /* UPDATE */

        if(existingRating){

            existingRating.rating = rating;

            await existingRating.save();

            return res.status(200).json({

                success:true,

                message:"Rating updated successfully",

                rating:existingRating

            });

        }



        /* CREATE */

        const newRating = await Rating.create({

            user:req.userId,

            destination:destinationId,

            rating

        });



        return res.status(201).json({

            success:true,

            message:"Rating added successfully",

            rating:newRating

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};





/* =========================================
   GET DESTINATION RATINGS
========================================= */

export const getRatings = async (req, res) => {
  try {
    const { destinationId } = req.params;

    const ratings = await Rating.find({
      destination: destinationId,
    });

    const totalRatings = ratings.length;

    const averageRating =
      totalRatings > 0
        ? (
            ratings.reduce(
              (acc, item) => acc + item.rating,
              0
            ) / totalRatings
          ).toFixed(1)
        : 0;

    const distribution = {
      5: ratings.filter(r => r.rating === 5).length,
      4: ratings.filter(r => r.rating === 4).length,
      3: ratings.filter(r => r.rating === 3).length,
      2: ratings.filter(r => r.rating === 2).length,
      1: ratings.filter(r => r.rating === 1).length,
    };

    return res.status(200).json({
      success: true,
      totalRatings,
      averageRating,
      distribution,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};