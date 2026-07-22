import api from "./axios";

export const getUsers = async () => {
  const response = await api.get(
    "/admin/users"
  );

  return response.data;
};

export const deleteUser = async (
  userId
) => {
  const response = await api.delete(
    `/admin/users/${userId}`
  );

  return response.data;
};


export const getAdminProfile =
  async () => {
    const response = await api.get(
      "/admin/profile"
    );

    return response.data;
  };
