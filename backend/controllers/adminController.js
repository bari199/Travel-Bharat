import { User } from "../models/userModel.js";
import { Destination } from "../models/destination.js";
import { Comment } from "../models/commentModel.js";
import { Rating } from "../models/ratingModel.js";
import { Wishlist } from "../models/wishlistModel.js";
import { Reaction } from "../models/reactionModel.js";
import bcrypt from "bcryptjs";
import { Admin } from "../models/adminModel.js";
import { generateAdminToken } from "../utils/generateAdminToken.js";

/**
 * ----------------------------------------
 * Admin Login
 * POST /api/admin/auth/login
 * ----------------------------------------
 */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find admin
    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Compare password
    const isPasswordMatched = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT
    const token = generateAdminToken(admin._id);

    return res.status(200).json({
      success: true,
      message: "Admin login successful.",

      admin: {
        _id: admin._id,
        email: admin.email,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      },

      token,
    });
  } catch (error) {
    console.error("Admin Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const adminLogout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Admin logged out successfully.",
    });
  } catch (error) {
    console.error("Admin Logout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -token -otp -otpExpiry")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalDestinations,
      totalComments,
      totalRatings,
      totalWishlist,
      totalReactions,
    ] = await Promise.all([
      User.countDocuments(),
      Destination.countDocuments(),
      Comment.countDocuments(),
      Rating.countDocuments(),
      Wishlist.countDocuments(),
      Reaction.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,

      stats: {
        totalUsers,
        totalDestinations,
        totalComments,
        totalRatings,
        totalWishlist,
        totalReactions,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      admin: {
        email: req.admin.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("user", "username email")
      .populate("destination", "name city state")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      total: comments.length,
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAdminComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    await comment.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find()
      .populate("user", "username email")
      .populate("destination", "name city state")
      .sort({
        createdAt: -1,
      });

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

export const deleteRating = async (req, res) => {
  try {
    await Rating.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Rating deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find()
      .populate("user", "username email")
      .populate("destination", "name city state category")
      .sort({
        createdAt: -1,
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

export const deleteWishlistAdmin = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Wishlist removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllReactions = async (req, res) => {
  try {
    const reactions = await Reaction.find()
      .populate("user", "username email")
      .populate("comment", "message")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      total: reactions.length,
      reactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteReaction = async (req, res) => {
  try {
    await Reaction.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Reaction deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
