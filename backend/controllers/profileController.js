import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import { User } from "../models/userModel.js";
import { Wishlist } from "../models/wishlistModel.js";
import { Comment } from "../models/commentModel.js";
import { Rating } from "../models/ratingModel.js";
import { ExperienceWishlist } from "../models/experienceWishlistModel.js";
import { ActivityWishlist } from "../models/activityWishlistModel.js";

/* =========================================
   GET PROFILE
========================================= */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "-password -token -otp -otpExpiry"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully.",
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
    const { username } = req.body;

    if (!username || !username.trim()) {
      return res.status(400).json({
        success: false,
        message: "Username is required.",
      });
    }

    let avatarUrl;

    if (req.file) {
      avatarUrl = req.file.path;
    }

    const updateData = {
      username: username.trim(),
    };

    if (avatarUrl) {
      updateData.avatar = avatarUrl;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password -token -otp -otpExpiry");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
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

/* =========================================
   UPDATE PASSWORD
========================================= */
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
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
      message: "Reviews fetched successfully.",
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
      message: "Ratings fetched successfully.",
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
      message: "Profile statistics fetched successfully.",
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



/* =========================================
   GET USER SAVED DESTINATIONS
========================================= */

export const getUserWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.userId,
    })
      .populate({
        path: "destination",
        select:
          "name title city state category images rating shortDescription",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully.",
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
   GET ALL SAVED ITEMS
========================================= */

export const getSavedItems = async (req, res) => {
  try {
    const [destinations, experiences, activities] = await Promise.all([

      Wishlist.find({
        user: req.userId,
      }).populate("destination"),

      ExperienceWishlist.find({
        user: req.userId,
      }).populate({
        path: "experience",
        populate: {
          path: "destination",
        },
      }),

      ActivityWishlist.find({
        user: req.userId,
      }).populate({
        path: "activity",
        populate: {
          path: "destination",
        },
      }),

    ]);

    return res.status(200).json({
      success: true,
      message: "Saved items fetched successfully.",

      saved: {

        destinations,

        experiences,

        activities,

      },

      total: {

        destinations: destinations.length,

        experiences: experiences.length,

        activities: activities.length,

      },

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};