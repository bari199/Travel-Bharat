import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  getProfile,
  getProfileStats,
  getSavedItems,
  getReviews,
  getRatings,
  updateProfile,
  changePassword,
} from "@/services/profileService";

import { removeWishlist } from "@/services/wishlistService";
import { removeExperienceWishlist } from "@/services/ExperienceWishlistService";
import { removeActivityWishlist } from "@/services/activityWishlistService";

export default function useProfile() {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    wishlist: 0,
    reviews: 0,
    ratings: 0,
  });

  const [saved, setSaved] = useState({
    destinations: [],
    experiences: [],
    activities: [],
  });

  const [reviews, setReviews] = useState([]);

  const [ratings, setRatings] = useState([]);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);

      const [
        profile,
        profileStats,
        savedItems,
        reviewData,
        ratingData,
      ] = await Promise.all([
        getProfile(),
        getProfileStats(),
        getSavedItems(),
        getReviews(),
        getRatings(),
      ]);

      setUser(profile);
      setStats(profileStats);

      setSaved({
        destinations: savedItems?.destinations || [],
        experiences: savedItems?.experiences || [],
        activities: savedItems?.activities || [],
      });

      setReviews(reviewData);
      setRatings(ratingData);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  /* ============================================================
      User Activity Timeline
  ============================================================ */

  const activity = useMemo(() => {
    const items = [];

    // ================= Destination Wishlist =================
    saved.destinations.forEach((item) => {
      items.push({
        _id: item._id,
        type: "wishlist",
        category: "destination",
        title: "Saved Destination",
        description: item.destination?.name,
        createdAt: item.createdAt,
      });
    });

    // ================= Experience Wishlist =================
    saved.experiences.forEach((item) => {
      items.push({
        _id: item._id,
        type: "wishlist",
        category: "experience",
        title: "Saved Experience",
        description: item.experience?.title,
        createdAt: item.createdAt,
      });
    });

    // ================= Activity Wishlist =================
    saved.activities.forEach((item) => {
      items.push({
        _id: item._id,
        type: "wishlist",
        category: "activity",
        title: "Saved Activity",
        description: item.activity?.title,
        createdAt: item.createdAt,
      });
    });

    // ================= Reviews =================
    reviews.forEach((item) => {
      items.push({
        _id: item._id,
        type: "review",
        title: "Added Review",
        description: item.destination?.name,
        createdAt: item.createdAt,
      });
    });

    // ================= Ratings =================
    ratings.forEach((item) => {
      items.push({
        _id: item._id,
        type: "rating",
        title: `Rated ${item.rating} ★`,
        description: item.destination?.name,
        createdAt: item.createdAt,
      });
    });

    return items.sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [saved, reviews, ratings]);

  const handleProfileUpdate = async (profileData) => {
    try {
      const updatedUser = await updateProfile(profileData);

      setUser(updatedUser);

      toast.success("Profile updated successfully.");

      return updatedUser;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile."
      );

      throw error;
    }
  };

  const handlePasswordChange = async (passwordData) => {
    try {
      const response = await changePassword(passwordData);

      toast.success(response.message);

      return response;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update password."
      );

      throw error;
    }
  };

  const handleRemoveWishlist = async (item) => {
  try {
    if (item.type === "destination") {
      await removeWishlist(item._id);
    }

    if (item.type === "experience") {
      await removeExperienceWishlist(item._id);
    }

    if (item.type === "activity") {
      await removeActivityWishlist(item._id);
    }

    toast.success("Removed from wishlist");

    loadProfile();
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        "Failed to remove wishlist."
    );
  }
};

  return {
    loading,
    user,
    stats,
    saved,
    reviews,
    ratings,
    activity,
    loadProfile,
    handleProfileUpdate,
    handlePasswordChange,
    handleRemoveWishlist
  };
}