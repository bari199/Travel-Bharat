import api from "./axios";

export const getReactions = async () => {
  const response = await api.get(
    "/api/admin/reactions"
  );

  return response.data;
};

export const deleteReaction = async (
  id
) => {
  const response = await api.delete(
    `/api/admin/reactions/${id}`
  );

  return response.data;
};