import { ActivityWishlist }
from "../models/activityWishlistModel.js";

/* =========================================
   TOGGLE ACTIVITY WISHLIST
========================================= */

export const toggleActivityWishlist =
  async (req, res) => {
    try {
      const { activityId } = req.params;

      const existing =
        await ActivityWishlist.findOne({
          user: req.userId,
          activity: activityId,
        });

      if (existing) {
        await ActivityWishlist.findByIdAndDelete(
          existing._id
        );

        return res.status(200).json({
          success: true,
          saved: false,
          message:
            "Removed from wishlist",
        });
      }

      await ActivityWishlist.create({
        user: req.userId,
        activity: activityId,
      });

      return res.status(200).json({
        success: true,
        saved: true,
        message:
          "Added to wishlist",
      });
    } catch (error) {
      console.error(
        "[toggleActivityWishlist]",
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

/* =========================================
   GET USER ACTIVITY WISHLIST
========================================= */

export const getActivityWishlist =
  async (req, res) => {
    try {
      const wishlist =
        await ActivityWishlist.find({
          user: req.userId,
        }).populate({
          path: "activity",
          populate: {
            path: "destination",
          },
        });

      return res.status(200).json({
        success: true,
        total: wishlist.length,
        wishlist,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  /* =========================================
   REMOVE ACTIVITY WISHLIST
========================================= */

export const removeActivityWishlist = async (req, res) => {
  try {
    const { wishlistId } = req.params;

    const wishlist = await ActivityWishlist.findOne({
      _id: wishlistId,
      user: req.userId,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    await ActivityWishlist.findByIdAndDelete(wishlistId);

    return res.status(200).json({
      success: true,
      message: "Activity removed from wishlist",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};