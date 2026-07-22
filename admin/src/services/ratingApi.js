import api from "./axios";

export const getRatings =
  async () => {
    const response =
      await api.get(
        "/admin/ratings"
      );

    return response.data;
  };

export const deleteRating =
  async (id) => {
    const response =
      await api.delete(
        `/admin/ratings/${id}`
      );

    return response.data;
  };