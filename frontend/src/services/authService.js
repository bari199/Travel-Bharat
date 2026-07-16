import api from "@/lib/api";

export const logout = async () => {
  const { data } = await api.post("/user/logout");

  return data;
};