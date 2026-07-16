import api from "@/lib/api";

/* =========================================
   DESTINATION WISHLIST
========================================= */

export const getWishlist = async () => {
  const { data } = await api.get("/wishlist");
  return data.wishlist;
};

export const toggleWishlist = async (destinationId) => {
  const { data } = await api.post("/wishlist", {
    destinationId,
  });

  return data;
};

export const removeWishlist = async (wishlistId) => {
  const { data } = await api.delete(
    `/wishlist/${wishlistId}`
  );

  return data;
};