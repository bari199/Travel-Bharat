import { Destination } from "../models/destination.js";
import { Comment } from "../models/commentModel.js";
import { Rating } from "../models/ratingModel.js";
import { Reaction } from "../models/reactionModel.js";
/*
|--------------------------------------------------------------------------
| ADD DESTINATION
|--------------------------------------------------------------------------
*/
export const addDestination = async (req, res) => {
  try {
    console.log("BODY");
    console.log(req.body);

    console.log("FILES");
    console.log(req.files);

    const destination = await Destination.create({
      ...req.body,
    });

    return res.status(201).json({
      success: true,
      message: "Destination Added Successfully",
      destination,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL DESTINATIONS
|--------------------------------------------------------------------------
*/
export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();

    return res.status(200).json({
      success: true,
      destinations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET SINGLE DESTINATION
|--------------------------------------------------------------------------
*/
export const getSingleDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination Not Found",
      });
    }

    /* ==========================
       REACTIONS
    ========================== */

    const totalLikes = await Reaction.countDocuments({
      destination: destination._id,
      type: "like",
    });

    const totalDislikes = await Reaction.countDocuments({
      destination: destination._id,
      type: "dislike",
    });

    /* ==========================
       RATINGS
    ========================== */

    const ratings = await Rating.find({
      destination: destination._id,
    });

    const totalRatings = ratings.length;

    const averageRating =
      totalRatings > 0
        ? Number(
            (
              ratings.reduce(
                (sum, item) => sum + item.rating,
                0
              ) / totalRatings
            ).toFixed(1)
          )
        : 0;

    /* ==========================
       COMMENTS
    ========================== */

    const totalComments = await Comment.countDocuments({
      destination: destination._id,
    });

    /* ==========================
       RESPONSE
    ========================== */

    return res.status(200).json({
      success: true,

      destination,

      stats: {
        likes: totalLikes,
        dislikes: totalDislikes,
        shares: destination.shares || 0,

        averageRating,
        totalRatings,

        totalComments,
      },
    });
  } catch (error) {
    console.log("GET SINGLE DESTINATION ERROR:");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/*
|--------------------------------------------------------------------------
| UPDATE DESTINATION
|--------------------------------------------------------------------------
*/
export const updateDestination = async (req, res) => {
  try {
    const updated = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Destination Updated Successfully",
      updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE DESTINATION
|--------------------------------------------------------------------------
*/
export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination Not Found",
      });
    }

    await Destination.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
