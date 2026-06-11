import api from "./axios";

export const getUsers = async () => {
  const response = await api.get(
    "/api/admin/users"
  );

  return response.data;
};

export const deleteUser = async (
  userId
) => {
  const response = await api.delete(
    `/api/admin/users/${userId}`
  );

  return response.data;
};


export const getAdminProfile =
  async () => {
    const response = await api.get(
      "/api/admin/profile"
    );

    return response.data;
  };
