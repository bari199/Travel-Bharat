import { Activity } from "../models/activityModel.js";
import { Destination } from "../models/destination.js";

/*
|--------------------------------------------------------------------------
| Helper — Safe JSON Parse
|--------------------------------------------------------------------------
*/

const safeParse = (value, fallback) => {
  if (!value) return fallback;

  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn("[safeParse]", error.message);
    return fallback;
  }
};

/*
|--------------------------------------------------------------------------
| Helper — Slugify
| Falls back to a URL-safe slug generated from the title when no slug is
| submitted, so the unique index on `slug` never collides on repeated
| empty/undefined values.
|--------------------------------------------------------------------------
*/

const slugify = (text = "") =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

/*
|--------------------------------------------------------------------------
| Helper — Error Status
| Validation/cast errors are the client's fault (400), anything else is
| a genuine server error (500).
|--------------------------------------------------------------------------
*/

const errorStatus = (error) =>
  error.name === "ValidationError" || error.name === "CastError" ? 400 : 500;

/*
|--------------------------------------------------------------------------
| ADD ACTIVITY
| POST /api/activities
|--------------------------------------------------------------------------
*/

export const addActivity = async (req, res) => {
  try {
    /* Parse Arrays */
    const thingsToCarry = safeParse(req.body.thingsToCarry, []);
    const equipmentProvided = safeParse(req.body.equipmentProvided, []);
    const safetyTips = safeParse(req.body.safetyTips, []);
    const highlights = safeParse(req.body.highlights, []);

    /* Upload Images */
    const images = req.files?.images?.map((file) => file.path) || [];

    /* Validate Destination */
    const destination = await Destination.findById(req.body.destination);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found.",
      });
    }

    /* Create Activity */
    const activity = await Activity.create({
      destination: destination._id,
      title: req.body.title,
      slug: req.body.slug
        ? slugify(req.body.slug)
        : slugify(req.body.title),
      shortDescription: req.body.shortDescription,
      description: req.body.description,
      images,
      category: req.body.category,
      activityType: req.body.activityType,
      duration: req.body.duration,
      difficulty: req.body.difficulty,
      location: req.body.location,
      meetingPoint: req.body.meetingPoint,
      openingHours: req.body.openingHours,
      price: Number(req.body.price || 0),
      minimumAge: Number(req.body.minimumAge || 0),
      maximumAge: Number(req.body.maximumAge || 100),
      fitnessLevel: req.body.fitnessLevel,
      bestTime: req.body.bestTime,
      thingsToCarry,
      equipmentProvided,
      safetyTips,
      highlights,
    });

    /* Link Activity to Destination */
    await Destination.findByIdAndUpdate(destination._id, {
      $addToSet: { activities: activity._id },
    });

    return res.status(201).json({
      success: true,
      message: "Activity added successfully.",
      activity,
    });
  } catch (error) {
    console.error("[addActivity]", error);

    return res.status(errorStatus(error)).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL ACTIVITIES
| GET /api/activities
|--------------------------------------------------------------------------
*/

export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("destination", "name city state category")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (error) {
    console.error("[getActivities]", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET ACTIVITIES BY DESTINATION
| GET /api/activities/destination/:destinationId
|--------------------------------------------------------------------------
*/

export const getActivitiesByDestination = async (req, res) => {
  try {
    const { destinationId } = req.params;

    const activities = await Activity.find({ destination: destinationId })
      .populate("destination", "name city state")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (error) {
    console.error("[getActivitiesByDestination]", error);

    return res.status(errorStatus(error)).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET SINGLE ACTIVITY
| GET /api/activities/:id
|--------------------------------------------------------------------------
*/

export const getSingleActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate(
      "destination",
      "name city state category"
    );

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found.",
      });
    }

    return res.status(200).json({
      success: true,
      activity,
    });
  } catch (error) {
    console.error("[getSingleActivity]", error);

    return res.status(errorStatus(error)).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| UPDATE ACTIVITY
| PUT /api/activities/:id
|--------------------------------------------------------------------------
*/

export const updateActivity = async (req, res) => {
  try {
    /* Find Existing Activity */
    const existingActivity = await Activity.findById(req.params.id);

    if (!existingActivity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found.",
      });
    }

    /* Parse Arrays */
    const thingsToCarry = safeParse(
      req.body.thingsToCarry,
      existingActivity.thingsToCarry
    );

    const equipmentProvided = safeParse(
      req.body.equipmentProvided,
      existingActivity.equipmentProvided
    );

    const safetyTips = safeParse(
      req.body.safetyTips,
      existingActivity.safetyTips
    );

    const highlights = safeParse(
      req.body.highlights,
      existingActivity.highlights
    );

    /* Images */
    const images =
      req.files?.images?.length > 0
        ? req.files.images.map((file) => file.path)
        : existingActivity.images;

    /* Destination Validation */
    const destinationId = req.body.destination || existingActivity.destination;

    const destination = await Destination.findById(destinationId);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found.",
      });
    }

    /* Sync Destination Relationship (only if destination actually changed) */
    if (
      existingActivity.destination.toString() !== destination._id.toString()
    ) {
      await Destination.findByIdAndUpdate(existingActivity.destination, {
        $pull: { activities: existingActivity._id },
      });

      await Destination.findByIdAndUpdate(destination._id, {
        $addToSet: { activities: existingActivity._id },
      });
    }

    /* Update Data */
    const updateData = {
      destination: destination._id,
      title: req.body.title ?? existingActivity.title,
      slug: req.body.slug ? slugify(req.body.slug) : existingActivity.slug,
      shortDescription:
        req.body.shortDescription ?? existingActivity.shortDescription,
      description: req.body.description ?? existingActivity.description,
      images,
      category: req.body.category ?? existingActivity.category,
      activityType: req.body.activityType ?? existingActivity.activityType,
      duration: req.body.duration ?? existingActivity.duration,
      difficulty: req.body.difficulty ?? existingActivity.difficulty,
      location: req.body.location ?? existingActivity.location,
      meetingPoint: req.body.meetingPoint ?? existingActivity.meetingPoint,
      openingHours: req.body.openingHours ?? existingActivity.openingHours,
      price:
        req.body.price !== undefined
          ? Number(req.body.price)
          : existingActivity.price,
      minimumAge:
        req.body.minimumAge !== undefined
          ? Number(req.body.minimumAge)
          : existingActivity.minimumAge,
      maximumAge:
        req.body.maximumAge !== undefined
          ? Number(req.body.maximumAge)
          : existingActivity.maximumAge,
      fitnessLevel: req.body.fitnessLevel ?? existingActivity.fitnessLevel,
      bestTime: req.body.bestTime ?? existingActivity.bestTime,
      thingsToCarry,
      equipmentProvided,
      safetyTips,
      highlights,
    };

    /* Save Update */
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate("destination", "name city state");

    return res.status(200).json({
      success: true,
      message: "Activity updated successfully.",
      activity: updatedActivity,
    });
  } catch (error) {
    console.error("[updateActivity]", error);

    return res.status(errorStatus(error)).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE ACTIVITY
| DELETE /api/activities/:id
|--------------------------------------------------------------------------
*/

export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found.",
      });
    }

    /* Remove Activity from Destination */
    await Destination.findByIdAndUpdate(activity.destination, {
      $pull: { activities: activity._id },
    });

    /* Delete Activity */
    await Activity.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Activity deleted successfully.",
    });
  } catch (error) {
    console.error("[deleteActivity]", error);

    return res.status(errorStatus(error)).json({
      success: false,
      message: error.message,
    });
  }
};