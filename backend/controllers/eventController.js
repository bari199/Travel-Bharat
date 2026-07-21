import { Event } from "../models/eventsModel.js";

/*
|--------------------------------------------------------------------------
| ADD EVENT
| POST /api/events
|--------------------------------------------------------------------------
*/
export const addEvent = async (req, res) => {
  try {
    console.log("[addEvent] BODY:", req.body);
    console.log("[addEvent] FILES:", req.files);

    const {
      destination,
      title,
      shortDescription,
      description,
      category,
      eventDate,
      startTime,
      endTime,
      location,
      organizer,
      ticketPrice,
      featured,
    } = req.body;

    if (!destination || !title || !shortDescription || !description) {
      return res.status(400).json({
        success: false,
        message:
          "destination, title, shortDescription and description are required",
      });
    }

    const images =
  req.files?.images?.map((file) => ({
    url: file.path,
    public_id: file.filename || file.public_id || "",
  })) || [];

    const event = await Event.create({
      destination,
      title,
      shortDescription,
      description,
      images,
      category: category || "",
      eventDate: eventDate ? new Date(eventDate) : undefined,
      startTime: startTime || "",
      endTime: endTime || "",
      location: location || "",
      organizer: organizer || "",
      ticketPrice: ticketPrice ? Number(ticketPrice) : 0,
      featured: featured === "true",
    });

    return res.status(201).json({
      success: true,
      message: "Event added successfully",
      event,
    });
  } catch (error) {
    console.error("[addEvent] ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL EVENTS
| GET /api/events
|--------------------------------------------------------------------------
*/
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("destination", "name city state")
      .sort({ eventDate: 1 });

    return res
      .status(200)
      .json({ success: true, count: events.length, events });
  } catch (error) {
    console.error("[getEvents] ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/*
|--------------------------------------------------------------------------
| GET EVENTS BY DESTINATION
| GET /api/events/destination/:destinationId
|--------------------------------------------------------------------------
*/
export const getEventsByDestination = async (req, res) => {
  try {
    const { destinationId } = req.params;

    const events = await Event.find({ destination: destinationId }).sort({
      eventDate: 1,
    });

    return res
      .status(200)
      .json({ success: true, count: events.length, events });
  } catch (error) {
    console.error("[getEventsByDestination] ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/*
|--------------------------------------------------------------------------
| GET SINGLE EVENT
| GET /api/events/:id
|--------------------------------------------------------------------------
*/
export const getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "destination",
      "name city state location",
    );

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    return res.status(200).json({ success: true, event });
  } catch (error) {
    console.error("[getSingleEvent] ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/*
|--------------------------------------------------------------------------
| UPDATE EVENT
| PUT /api/events/:id
|--------------------------------------------------------------------------
*/
export const updateEvent = async (req, res) => {
  try {
    console.log("[updateEvent] BODY:", req.body);
    console.log("[updateEvent] FILES:", req.files);

    const existing = await Event.findById(req.params.id);
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    const images =
  req.files?.images?.length > 0
    ? req.files.images.map((file) => ({
        url: file.path,
        public_id: file.filename || file.public_id || "",
      }))
    : existing.images;

    const updateData = {
      title: req.body.title ?? existing.title,
      shortDescription: req.body.shortDescription ?? existing.shortDescription,
      description: req.body.description ?? existing.description,
      category: req.body.category ?? existing.category,
      eventDate: req.body.eventDate
        ? new Date(req.body.eventDate)
        : existing.eventDate,
      startTime: req.body.startTime ?? existing.startTime,
      endTime: req.body.endTime ?? existing.endTime,
      location: req.body.location ?? existing.location,
      organizer: req.body.organizer ?? existing.organizer,
      ticketPrice:
        req.body.ticketPrice !== undefined
          ? Number(req.body.ticketPrice)
          : existing.ticketPrice,
      featured:
        req.body.featured !== undefined
          ? req.body.featured === "true"
          : existing.featured,
      images,
    };

    const updated = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updated,
    });
  } catch (error) {
    console.error("[updateEvent] ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE EVENT
| DELETE /api/events/:id
|--------------------------------------------------------------------------
*/
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    await Event.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("[deleteEvent] ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
