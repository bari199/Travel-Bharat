import api from "@/lib/api";

/* ==========================================
   PROFILE
========================================== */

export const getProfile = async () => {
  const { data } = await api.get("/profile");
  return data.user;
};

/* ==========================================
   PROFILE STATS
========================================== */

export const getProfileStats = async () => {
  const { data } = await api.get("/profile/stats");
  return data.stats;
};

/* ==========================================
   SAVED ITEMS
========================================== */

export const getSavedItems = async () => {
  const { data } = await api.get("/profile/saved");
  return data.saved;
};

/* ==========================================
   REVIEWS
========================================== */

export const getReviews = async () => {
  const { data } = await api.get("/profile/reviews");
  return data.reviews;
};

/* ==========================================
   RATINGS
========================================== */

export const getRatings = async () => {
  const { data } = await api.get("/profile/ratings");
  return data.ratings;
};

/* ==========================================
   UPDATE PROFILE
========================================== */

export const updateProfile = async (profileData) => {
  const formData = new FormData();

  formData.append("username", profileData.username);

  if (profileData.avatar) {
    formData.append("avatar", profileData.avatar);
  }

  const { data } = await api.put("/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.user;
};

/* ==========================================
   CHANGE PASSWORD
========================================== */

export const changePassword = async (passwordData) => {
  const { data } = await api.put(
    "/profile/change-password",
    passwordData
  );

  return data;
};