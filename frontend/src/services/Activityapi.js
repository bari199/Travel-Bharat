import api from "./axios";

/* ==========================================================
   GET ALL ACTIVITIES
========================================================== */

export const getActivities = async () => {
  const { data } = await api.get("/api/activities");
  return data;
};

/* ==========================================================
   GET SINGLE ACTIVITY
========================================================== */

export const getSingleActivity = async (id) => {
  const { data } = await api.get(`/api/activities/${id}`);
  return data;
};

/* ==========================================================
   GET ACTIVITY BY SLUG
========================================================== */

export const getActivityBySlug = async (slug) => {
  const { data } = await api.get(`/api/activities/slug/${slug}`);
  return data;
};

/* ==========================================================
   GET ACTIVITIES BY DESTINATION
========================================================== */

export const getActivitiesByDestination = async (destinationId) => {
  const { data } = await api.get(
    `/api/activities/destination/${destinationId}`
  );

  return data;
};

/* ==========================================================
   BUILD FORM DATA
========================================================== */

const buildFormData = (activity) => {
  const formData = new FormData();

  formData.append("destination", activity.destination || "");
  formData.append("title", activity.title || "");
  formData.append("slug", activity.slug || "");
  formData.append("shortDescription", activity.shortDescription || "");
  formData.append("description", activity.description || "");
  formData.append("category", activity.category || "");
  formData.append("activityType", activity.activityType || "");
  formData.append("duration", activity.duration || "");
  formData.append("difficulty", activity.difficulty || "");
  formData.append("location", activity.location || "");
  formData.append("meetingPoint", activity.meetingPoint || "");
  formData.append("openingHours", activity.openingHours || "");
  formData.append("price", activity.price || 0);
  formData.append("minimumAge", activity.minimumAge || 0);
  formData.append("maximumAge", activity.maximumAge || 100);
  formData.append("fitnessLevel", activity.fitnessLevel || "");
  formData.append("bestTime", activity.bestTime || "");

  activity.images?.forEach((image) => {
    if (image instanceof File) {
      formData.append("images", image);
    }
  });

  formData.append(
    "thingsToCarry",
    JSON.stringify(activity.thingsToCarry || [])
  );

  formData.append(
    "equipmentProvided",
    JSON.stringify(activity.equipmentProvided || [])
  );

  formData.append(
    "safetyTips",
    JSON.stringify(activity.safetyTips || [])
  );

  formData.append(
    "highlights",
    JSON.stringify(activity.highlights || [])
  );

  return formData;
};

/* ==========================================================
   CREATE ACTIVITY
========================================================== */

export const createActivity = async (activity) => {
  const formData = buildFormData(activity);

  const { data } = await api.post(
    "/api/activities",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

/* ==========================================================
   UPDATE ACTIVITY
========================================================== */

export const updateActivity = async (id, activity) => {
  const formData = buildFormData(activity);

  const { data } = await api.put(
    `/api/activities/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

/* ==========================================================
   DELETE ACTIVITY
========================================================== */

export const deleteActivity = async (id) => {
  const { data } = await api.delete(`/api/activities/${id}`);
  return data;
};