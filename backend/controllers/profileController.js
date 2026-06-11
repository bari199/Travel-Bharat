import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
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
      "-password -token -otp -otpExpiry",
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
    let avatarUrl;

    if (req.file) {
      avatarUrl = req.file.path;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        username: req.body.username,
        ...(avatarUrl && { avatar: avatarUrl }),
      },
      { returnDocument: "after" },
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    console.log(error.stack);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const user = await User.findById(req.userId);

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
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
      .populate("destination", "name city state category images")
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
      .populate("destination", "name city state category images")
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
    const [wishlistCount, reviewCount, ratingCount] = await Promise.all([
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
