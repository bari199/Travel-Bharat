import api from "./axios";

/* =========================
   GET ALL
========================= */
export const getDestinations = async () => {
  const response = await api.get(
    "/destinations"
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
    `/destinations/${id}`
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
  formData.append("area",data.area || "");

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
     -----------------------------------------------------------
     IMPORTANT: on edit, `data.images` is a mix of:
       - existing images already saved in the DB (plain objects
         like { url, public_id }, kept because the user didn't
         remove them), and
       - brand new File objects the user just dropped in.
     The backend has no way to know which old images survived
     unless we explicitly tell it — otherwise it can't
     distinguish "no new uploads" from "user deleted everything".
     So we send both pieces separately:
       - "images"          -> only the new File uploads
       - "existingImages"  -> the kept (non-File) image records
  ------------------------ */

  const existingImages =
    data.images?.filter(
      (img) => img && !(img instanceof File) && (img.url || typeof img === "string")
    ) || [];

  formData.append(
    "existingImages",
    JSON.stringify(existingImages)
  );

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
     (same existing/new split as Main Images above)
  ------------------------ */

  const existingPlaceImages =
    data.placeImages?.filter(
      (img) => img && !(img instanceof File) && (img.url || typeof img === "string")
    ) || [];

  formData.append(
    "existingPlaceImages",
    JSON.stringify(existingPlaceImages)
  );

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

//   data.bestExperiences?.forEach(
//   (experience) => {
//     if (
//       experience.image instanceof File
//     ) {
//       formData.append(
//         "bestExperienceImages",
//         experience.image
//       );
//     }
//   }
// );

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

  // formData.append(
  //   "bestExperiences",
  //   JSON.stringify(
  //     cleanedExperiences
  //   )
  // );

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
      `/destinations/${id}`,
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
        `/destinations/${id}`
      );

    return response.data;
  };