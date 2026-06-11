import api from "./axios";

export const getDashboardStats =
  async () => {
    const response = await api.get(
      "/api/admin/dashboard"
    );

    return response.data;
  };