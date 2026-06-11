import api from "./axios";

const adminLogin = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export { adminLogin };