import api from "@/lib/api";

export const getProfile =
  async () => {
    const { data } =
      await api.get(
        "/api/profile"
      );

    return data.user;
  };

export const getWishlist =
  async () => {
    const { data } =
      await api.get(
        "/api/wishlist"
      );

    return data.wishlist;
  };

export const getReviews =
  async () => {
    const { data } =
      await api.get(
        "/api/profile/reviews"
      );

    return data.reviews;
  };

export const getRatings =
  async () => {
    const { data } =
      await api.get(
        "/api/profile/ratings"
      );

    return data.ratings;
  };

export const updateProfile =
  async (profileData) => {
    const { data } =
      await api.put(
        "/api/profile",
        profileData
      );

    return data.user;
  };

export const changePassword =
  async (email, body) => {
    const { data } =
      await api.post(
        `/user/change-password/${email}`,
        body
      );

    return data;
  };