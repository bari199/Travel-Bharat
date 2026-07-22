import api from "./axios";

export const getDashboardStats =
  async () => {
    const response = await api.get(
      "/admin/dashboard"
    );

    return response.data;
  };