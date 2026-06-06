import { useEffect, useMemo, useState } from "react";

import {
  getProfile,
  getWishlist,
  getReviews,
  getRatings,
  updateProfile,
  changePassword,
} from "@/services/profileService";

import { generateActivity } from "@/lib/generateActivity";

export default function useProfile() {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  const [wishlist, setWishlist] = useState([]);

  const [reviews, setReviews] = useState([]);

  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const [userData, wishlistData, reviewData, ratingData] =
        await Promise.all([
          getProfile(),
          getWishlist(),
          getReviews(),
          getRatings(),
        ]);

      setUser(userData);

      setWishlist(wishlistData);

      setReviews(reviewData);

      setRatings(ratingData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const activity = useMemo(() => {
    return generateActivity({
      wishlist,
      reviews,
      ratings,
    });
  }, [wishlist, reviews, ratings]);

  const stats = {
    wishlist: wishlist.length,
    reviews: reviews.length,
    ratings: ratings.length,
  };

  const handleProfileUpdate = async (data) => {
    const updatedUser = await updateProfile(data);

    setUser(updatedUser);
  };

  const handlePasswordChange = async (data) => {
    await changePassword(user.email, data);
  };

  return {
    user,
    stats,
    wishlist,
    reviews,
    ratings,
    activity,
    loading,
    handleProfileUpdate,
    handlePasswordChange,
  };
}
