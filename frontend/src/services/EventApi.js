import api from "@/lib/api";

// --------------------------------------------------
// Get All Events
// --------------------------------------------------

export const getEvents = async () => {
  const { data } = await api.get("/events");
  return data;
};

// --------------------------------------------------
// Get Single Event
// --------------------------------------------------

export const getSingleEvent = async (id) => {
  const { data } = await api.get(`/events/${id}`);
  return data;
};

// --------------------------------------------------
// Get Events By Destination
// --------------------------------------------------

export const getEventsByDestination = async (destinationId) => {
  const { data } = await api.get(
    `/events/destination/${destinationId}`
  );

  return data;
};
