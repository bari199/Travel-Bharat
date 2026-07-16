import api from "@/lib/api";

/* =========================================
   ACTIVITY WISHLIST
========================================= */

export const getActivityWishlist = async () => {
  const { data } = await api.get("/activity-wishlist");

  return data.wishlist;
};

export const toggleActivityWishlist = async (activityId) => {
  const { data } = await api.post(`/activity-wishlist/${activityId}`);

  return data;
};

export const removeActivityWishlist = async (wishlistId) => {
  const { data } = await api.delete(`/activity-wishlist/${wishlistId}`);

  return data;
};
