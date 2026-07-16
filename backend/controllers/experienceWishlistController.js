import { ExperienceWishlist } from "../models/experienceWishlistModel.js";

/* =========================================
   TOGGLE EXPERIENCE WISHLIST
========================================= */

export const toggleExperienceWishlist = async (req, res) => {
  try {
    const { experienceId } = req.params;

    const existing = await ExperienceWishlist.findOne({
      user: req.userId,
      experience: experienceId,
    });

    if (existing) {
      await ExperienceWishlist.findByIdAndDelete(existing._id);

      return res.status(200).json({
        success: true,
        saved: false,
        message: "Removed from wishlist",
      });
    }

    await ExperienceWishlist.create({
      user: req.userId,
      experience: experienceId,
    });

    return res.status(200).json({
      success: true,
      saved: true,
      message: "Added to wishlist",
    });
  } catch (error) {
    console.error("[toggleExperienceWishlist]", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================
   GET USER EXPERIENCE WISHLIST
========================================= */

export const getExperienceWishlist = async (req, res) => {
  try {
    const wishlist = await ExperienceWishlist.find({
      user: req.userId,
    }).populate({
      path: "experience",
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
   REMOVE EXPERIENCE WISHLIST
========================================= */

export const removeExperienceWishlist = async (req, res) => {
  try {
    const { wishlistId } = req.params;

    const wishlist = await ExperienceWishlist.findOne({
      _id: wishlistId,
      user: req.userId,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    await ExperienceWishlist.findByIdAndDelete(wishlistId);

    return res.status(200).json({
      success: true,
      message: "Experience removed from wishlist",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};