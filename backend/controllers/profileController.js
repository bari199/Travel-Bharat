import { User } from "../models/userModel.js";
import { Wishlist } from "../models/wishlistModel.js";
import { Comment } from "../models/commentModel.js";
import { Rating } from "../models/ratingModel.js";

/* =========================================
   GET PROFILE
========================================= */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "-password -token -otp -otpExpiry"
    );

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================
   UPDATE PROFILE
========================================= */
export const updateProfile = async (req, res) => {
  try {
    const { username, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        username,
        avatar,
      },
      {
        new: true,
      }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================
   GET USER REVIEWS
========================================= */
export const getUserReviews = async (req, res) => {
  try {
    const reviews = await Comment.find({
      user: req.userId,
    })
      .populate(
        "destination",
        "name city state category images"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: reviews.length,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================
   GET USER RATINGS
========================================= */
export const getUserRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({
      user: req.userId,
    })
      .populate(
        "destination",
        "name city state category images"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: ratings.length,
      ratings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================
   GET USER STATS
========================================= */
export const getUserStats = async (req, res) => {
  try {
    const [wishlistCount, reviewCount, ratingCount] =
      await Promise.all([
        Wishlist.countDocuments({
          user: req.userId,
        }),

        Comment.countDocuments({
          user: req.userId,
        }),

        Rating.countDocuments({
          user: req.userId,
        }),
      ]);

    return res.status(200).json({
      success: true,
      stats: {
        wishlist: wishlistCount,
        reviews: reviewCount,
        ratings: ratingCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};