import api from "@/lib/api";

/* =========================================
   EXPERIENCE WISHLIST
========================================= */

export const getExperienceWishlist = async () => {
  const { data } = await api.get("/experience-wishlist");

  return data.wishlist;
};

export const toggleExperienceWishlist = async (experienceId) => {
  const { data } = await api.post(
    `/experience-wishlist/${experienceId}`
  );

  return data;
};

export const removeExperienceWishlist = async (wishlistId) => {
  const { data } = await api.delete(
    `/experience-wishlist/${wishlistId}`
  );

  return data;
};