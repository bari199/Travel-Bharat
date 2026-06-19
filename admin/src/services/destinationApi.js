import api from "./axios";

/* =========================
   GET ALL
========================= */
export const getDestinations = async () => {
  const response = await api.get(
    "/api/destinations"
  );

  return response.data;
};

/* =========================
   GET SINGLE
========================= */
export const getDestination = async (
  id
) => {
  const response = await api.get(
    `/api/destinations/${id}`
  );

  return response.data;
};

/* =========================
   BUILD FORMDATA
========================= */
const buildFormData = (data) => {
  const formData = new FormData();

  /* ------------------------
     Basic Fields
  ------------------------ */

  formData.append("name", data.name || "");
  formData.append("title", data.title || "");
  formData.append("state", data.state || "");
  formData.append("city", data.city || "");
  formData.append("category", data.category || "");
  formData.append("location", data.location || "");

  formData.append(
    "shortDescription",
    data.shortDescription || ""
  );

  formData.append(
    "description",
    data.description || ""
  );

  formData.append(
    "bestTimeToVisit",
    data.bestTimeToVisit || ""
  );

  formData.append(
    "entryFee",
    data.entryFee || ""
  );

  formData.append(
    "featured",
    data.featured
  );

  data.nearbyAttractions?.forEach(
  (attraction) => {
    if (
      attraction.image instanceof File
    ) {
      formData.append(
        "nearbyAttractionImages",
        attraction.image
      );
    }
  }
);

  /* ------------------------
     Main Images
  ------------------------ */

  data.images?.forEach((file) => {
    if (file instanceof File) {
      formData.append(
        "images",
        file
      );
    }
  });

  /* ------------------------
     Place Images
  ------------------------ */

  data.placeImages?.forEach((file) => {
    if (file instanceof File) {
      formData.append(
        "placeImages",
        file
      );
    }
  });

  /* ------------------------
     Experience Images
  ------------------------ */

  data.bestExperiences?.forEach(
  (experience) => {
    if (
      experience.image instanceof File
    ) {
      formData.append(
        "bestExperienceImages",
        experience.image
      );
    }
  }
);

  /* ------------------------
     Highlights
  ------------------------ */

  formData.append(
    "highlights",
    JSON.stringify(
      data.highlights || []
    )
  );

  formData.append(
  "seasonGuide",
  JSON.stringify(data.seasonGuide || {})
);
  /* ------------------------
     Best Experiences
  ------------------------ */

  const cleanedExperiences =
    data.bestExperiences?.map(
          ({
      title,
      subtitle,
      description,
      location,
      distance,
      bestTime,
      duration,
      offer,
      highlights,
      buttonLink,
    }) => ({
      title,
      subtitle,
      description,
      location,
      distance,
      bestTime,
      duration,
      offer,
      highlights,
      buttonLink,
    })
  ) || [];

  formData.append(
    "bestExperiences",
    JSON.stringify(
      cleanedExperiences
    )
  );

  /* ------------------------
     Nearby Attractions
  ------------------------ */



  const cleanedAttractions =
  data.nearbyAttractions?.map(
    ({
      title,
      description,
      distance,
      bestTime,
      highlights,
      mapLink,
    }) => ({
      title,
      description,
      distance,
      bestTime,
      highlights,
      mapLink,
    })
  ) || [];
  formData.append(
    "nearbyAttractions",
    JSON.stringify(
      cleanedAttractions
    )
  );

  return formData;
};

/* =========================
   CREATE
========================= */
export const createDestination =
  async (data) => {
    const formData =
      buildFormData(data);

    const response = await api.post(
      "/api/destinations",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  };

/* =========================
   UPDATE
========================= */
export const updateDestination =
  async (id, data) => {
    const formData =
      buildFormData(data);

    const response = await api.put(
      `/api/destinations/${id}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  };

/* =========================
   DELETE
========================= */
export const deleteDestination =
  async (id) => {
    const response =
      await api.delete(
        `/api/destinations/${id}`
      );

    return response.data;
  };