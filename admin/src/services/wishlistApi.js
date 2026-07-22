import api from "./axios";

export const getWishlist =
  async () => {
    const response =
      await api.get(
        "/admin/wishlist"
      );

    return response.data;
  };

export const deleteWishlist =
  async (id) => {
    const response =
      await api.delete(
        `/admin/wishlist/${id}`
      );

    return response.data;
  };