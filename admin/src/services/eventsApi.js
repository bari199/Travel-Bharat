import axiosInstance from "./axios";

/* ===========================================================
   Build multipart FormData for create/update
   -----------------------------------------------------------
   The backend (eventRoute.js) parses "images" as a multer
   file field (upload.fields), so every write goes through
   multipart/form-data — same convention as experienceApi.
=========================================================== */

const buildEventFormData = (data) => {
  const formData = new FormData();

  formData.append("destination", data.destination || "");
  formData.append("title", data.title || "");
  formData.append("shortDescription", data.shortDescription || "");
  formData.append("description", data.description || "");
  formData.append("category", data.category || "");
  formData.append("eventDate", data.eventDate || "");
  formData.append("startTime", data.startTime || "");
  formData.append("endTime", data.endTime || "");
  formData.append("location", data.location || "");
  formData.append("organizer", data.organizer || "");
  formData.append("ticketPrice", data.ticketPrice || 0);
  formData.append("featured", data.featured ? "true" : "false");

  (data.images || []).forEach((image) => {
    // Only newly-picked File objects need to be uploaded — existing
    // image URLs already live on the backend document and are kept
    // automatically by updateEvent() when no new files are sent.
    if (image instanceof File) {
      formData.append("images", image);
    }
  });

  return formData;
};

/* ===========================================================
   GET ALL
=========================================================== */

export const getEvents = async () => {
  const res = await axiosInstance.get("/events");
  return res.data;
};

/* ===========================================================
   GET BY DESTINATION
=========================================================== */

export const getEventsByDestination = async (destinationId) => {
  const res = await axiosInstance.get(
    `/events/destination/${destinationId}`,
  );
  return res.data;
};

/* ===========================================================
   GET SINGLE
=========================================================== */

export const getEvent = async (id) => {
  const res = await axiosInstance.get(`/events/${id}`);
  return res.data;
};

/* ===========================================================
   CREATE
=========================================================== */

export const createEvent = async (data) => {
  const formData = buildEventFormData(data);

  const res = await axiosInstance.post("/events", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

/* ===========================================================
   UPDATE
=========================================================== */

export const updateEvent = async (id, data) => {
  
  const formData = buildEventFormData(data);

  const res = await axiosInstance.put(`/events/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

/* ===========================================================
   DELETE
=========================================================== */

export const deleteEvent = async (id) => {
  const res = await axiosInstance.delete(`/events/${id}`);
  return res.data;
};