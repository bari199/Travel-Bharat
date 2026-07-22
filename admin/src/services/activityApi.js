import api from "./axios";

/* ============================================
    GET ALL ACTIVITIES
============================================ */

export const getActivities = async () => {
  const response = await api.get("/activities");

  return response.data;
};

/* ============================================
    GET SINGLE ACTIVITY
============================================ */

export const getActivity = async (id) => {
  const response = await api.get(`/activities/${id}`);

  return response.data.activity;
};

/* ============================================
    GET ACTIVITIES BY DESTINATION
============================================ */

export const getActivitiesByDestination = async (destinationId) => {
  const response = await api.get(
    `/activities/destination/${destinationId}`,
  );

  return response.data;
};

/* ============================================
    BUILD FORMDATA
============================================ */

const buildFormData = (data) => {
  const formData = new FormData();

  /* ----------------------------------------
      Helper: append a scalar value while
      preserving valid falsy values (0, false)
      instead of collapsing them to ""
  ---------------------------------------- */

  const appendValue = (key, value) => {
    formData.append(key, value === undefined || value === null ? "" : value);
  };

  /* ----------------------------------------
      Helper: some fields (e.g. destination)
      may be stored as the full selected object
      ({ _id, name, ... }) instead of just the id.
      Always send the id string to the backend.
  ---------------------------------------- */

  const appendId = (key, value) => {
    const id = value && typeof value === "object" ? value._id : value;
    formData.append(key, id ?? "");
  };

  /* ----------------------------------------
      Basic Information
  ---------------------------------------- */

  appendId("destination", data.destination);

  appendValue("title", data.title);

  appendValue("slug", data.slug);

  appendValue("shortDescription", data.shortDescription);

  appendValue("description", data.description);

  appendValue("category", data.category);

  appendValue("activityType", data.activityType);

  /* ----------------------------------------
      Activity Details
  ---------------------------------------- */

  appendValue("duration", data.duration);

  appendValue("difficulty", data.difficulty);

  appendValue("location", data.location);

  appendValue("meetingPoint", data.meetingPoint);

  appendValue("openingHours", data.openingHours);

  /* ----------------------------------------
      Visitor Information
  ---------------------------------------- */

  appendValue("price", data.price);

  appendValue("minimumAge", data.minimumAge);

  appendValue("maximumAge", data.maximumAge);

  appendValue("fitnessLevel", data.fitnessLevel);

  appendValue("bestTime", data.bestTime);

  /* ----------------------------------------
      Dynamic Lists
  ---------------------------------------- */

  formData.append(
    "thingsToCarry",

    JSON.stringify(data.thingsToCarry || []),
  );

  formData.append(
    "equipmentProvided",

    JSON.stringify(data.equipmentProvided || []),
  );

  formData.append(
    "safetyTips",

    JSON.stringify(data.safetyTips || []),
  );

  formData.append(
    "highlights",

    JSON.stringify(data.highlights || []),
  );

  /* ----------------------------------------
      Images
  ---------------------------------------- */

  data.images?.forEach((image) => {
    if (image instanceof File) {
      formData.append(
        "images",

        image,
      );
    }
  });

  return formData;
};

/* ============================================
    CREATE ACTIVITY
============================================ */

export const createActivity = async (data) => {
  const formData = buildFormData(data);

  const response = await api.post(
    "/api/activities",

    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

/* ============================================
    UPDATE ACTIVITY
============================================ */

export const updateActivity = async (
  id,

  data,
) => {
  const formData = buildFormData(data);

  const response = await api.put(
    `/activities/${id}`,

    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

/* ============================================
    DELETE ACTIVITY
============================================ */

export const deleteActivity = async (id) => {
  const response = await api.delete(`/activities/${id}`);

  return response.data;
};
