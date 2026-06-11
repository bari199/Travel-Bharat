import api from "./axios";

export const getComments =
  async () => {
    const response =
      await api.get(
        "/api/admin/comments"
      );

    return response.data;
  };

export const deleteComment =
  async (id) => {
    const response =
      await api.delete(
        `/api/admin/comments/${id}`
      );

    return response.data;
  };