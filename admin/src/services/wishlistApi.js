import api from "./axios";

export const getWishlist =
  async () => {
    const response =
      await api.get(
        "/api/admin/wishlist"
      );

    return response.data;
  };

export const deleteWishlist =
  async (id) => {
    const response =
      await api.delete(
        `/api/admin/wishlist/${id}`
      );

    return response.data;
  };