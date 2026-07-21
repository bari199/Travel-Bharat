import api from "./axios";

/* ==========================================================
   GET ALL EXPERIENCES
========================================================== */

export const getExperiences = async () => {
  const response = await api.get("/api/experiences");

  return response.data;
};

export const getExperienceNavbar = () =>
  api.get("/api/experiences/navbar");

/* ==========================================================
   GET SINGLE EXPERIENCE
========================================================== */

export const getSingleExperience = async (id) => {
  const response = await api.get(`/api/experiences/${id}`);

  return response.data;
};

/* ==========================================================
   GET EXPERIENCES BY DESTINATION
========================================================== */

export const getExperiencesByDestination = async (destinationId) => {
  const response = await api.get(
    `/api/experiences/destination/${destinationId}`
  );

  return response.data;
};

/* ==========================================================
   BUILD FORM DATA
========================================================== */

const buildFormData = (data) => {
  const formData = new FormData();

  /* ---------------------------------------
      Basic Fields
  --------------------------------------- */

  formData.append("destination", data.destination || "");

  formData.append("title", data.title || "");

  formData.append("shortDescription", data.shortDescription || "");

  formData.append("shortDescription", data.shortDescription || "");

  formData.append("category", data.category || "");

  formData.append("duration", data.duration || "");

  formData.append("distance", data.distance || "");

  formData.append("bestTime", data.bestTime || "");

  formData.append("priceRange", data.priceRange || "");

  formData.append("difficultyLevel", data.difficultyLevel || "");

  formData.append("location", data.location || "");
  /* ---------------------------------------
      Featured / Status
  --------------------------------------- */

  formData.append("icon", data.icon ?? false);

  /* ---------------------------------------
      Images
  --------------------------------------- */

  data.images?.forEach((image) => {
    if (image instanceof File) {
      formData.append("images", image);
    }
  });

  /* ---------------------------------------
      Highlights
  --------------------------------------- */

  formData.append(
    "highlights",

    JSON.stringify(data.highlights || []),
  );

  /* ---------------------------------------
      Tags
  --------------------------------------- */

  formData.append(
    "tags",

    JSON.stringify(data.tags || []),
  );

  /* ---------------------------------------
      Includes
  --------------------------------------- */

  formData.append(
    "includes",

    JSON.stringify(data.includes || []),
  );

  /* ---------------------------------------
      Excludes
  --------------------------------------- */

  formData.append(
    "excludes",

    JSON.stringify(data.excludes || []),
  );

  /* ---------------------------------------
      Things To Carry
  --------------------------------------- */

  formData.append(
    "thingsToCarry",

    JSON.stringify(data.thingsToCarry || []),
  );

  return formData;
};

/* ==========================================================
   CREATE EXPERIENCE
========================================================== */

export const createExperience = async (data) => {
  const formData = buildFormData(data);

  const response = await api.post(
    "/api/experiences",

    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

/* ==========================================================
   UPDATE EXPERIENCE
========================================================== */

export const updateExperience = async (id, data) => {
  const formData = buildFormData(data);

  const response = await api.put(
    `/api/experiences/${id}`,

    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

/* ==========================================================
   DELETE EXPERIENCE
========================================================== */

export const deleteExperience = async (id) => {
  const response = await api.delete(`/api/experiences/${id}`);

  return response.data;
};

/* ==========================================================
   EXPORTS
========================================================== */

/*
This file exports:

✔ getExperiences()
✔ getExperience()
✔ createExperience()
✔ updateExperience()
✔ deleteExperience()

*/