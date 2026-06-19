import { Destination } from "../models/destination.js";
import { Comment } from "../models/commentModel.js";
import { Rating } from "../models/ratingModel.js";
import { Reaction } from "../models/reactionModel.js";

export const addDestination = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const highlights = req.body.highlights
      ? JSON.parse(req.body.highlights)
      : [];

    const seasonGuide = req.body.seasonGuide
      ? JSON.parse(req.body.seasonGuide)
      : {
          summer: {
            months: "",
            essentials: [],
          },
          monsoon: {
            months: "",
            essentials: [],
          },
          winter: {
            months: "",
            essentials: [],
          },
        };

    let bestExperiences = req.body.bestExperiences
      ? JSON.parse(req.body.bestExperiences)
      : [];

    let nearbyAttractions = req.body.nearbyAttractions
      ? JSON.parse(req.body.nearbyAttractions)
      : [];

    const images = req.files?.images?.map((file) => file.path) || [];

    const placeImages = req.files?.placeImages?.map((file) => file.path) || [];

    const bestExperienceImages = req.files?.bestExperienceImages || [];

    bestExperiences.forEach((experience, index) => {
      experience.image = bestExperienceImages[index]?.path || "";
    });

    const nearbyAttractionImages = req.files?.nearbyAttractionImages || [];

    nearbyAttractions.forEach((attraction, index) => {
      attraction.image = nearbyAttractionImages[index]?.path || "";
    });

    const destination = await Destination.create({
      name: req.body.name,
      title: req.body.title,
      state: req.body.state,
      city: req.body.city,
      category: req.body.category,
      location: req.body.location,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
      bestTimeToVisit: req.body.bestTimeToVisit,
      entryFee: req.body.entryFee,
      featured: req.body.featured === "true",
      seasonGuide,
      images,
      placeImages,
      highlights,
      bestExperiences,
      nearbyAttractions,
    });

    return res.status(201).json({
      success: true,
      message: "Destination Added Successfully",
      destination,
    });
  } catch (error) {
    console.error("ADD DESTINATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL DESTINATIONS
|--------------------------------------------------------------------------
*/
export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();

    return res.status(200).json({
      success: true,
      destinations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDestinationsByState = async (req, res) => {
  try {
    const { stateSlug } = req.params;
    const stateName = stateSlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const destinations = await Destination.find({
      state: {
        $regex: new RegExp(`^${stateName}$`, "i"),
      },
    });
    return res.status(200).json({
      success: true,
      count: destinations.length,
      destinations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET SINGLE DESTINATION
|--------------------------------------------------------------------------
*/
export const getSingleDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination Not Found",
      });
    }

    /* ==========================
       REACTIONS
    ========================== */

    const totalLikes = await Reaction.countDocuments({
      destination: destination._id,
      type: "like",
    });

    const totalDislikes = await Reaction.countDocuments({
      destination: destination._id,
      type: "dislike",
    });

    /* ==========================
       RATINGS
    ========================== */

    const ratings = await Rating.find({
      destination: destination._id,
    });

    const totalRatings = ratings.length;

    const averageRating =
      totalRatings > 0
        ? Number(
            (
              ratings.reduce((sum, item) => sum + item.rating, 0) / totalRatings
            ).toFixed(1),
          )
        : 0;

    /* ==========================
       COMMENTS
    ========================== */

    const totalComments = await Comment.countDocuments({
      destination: destination._id,
    });

    /* ==========================
       RESPONSE
    ========================== */

    return res.status(200).json({
      success: true,

      destination,

      stats: {
        likes: totalLikes,
        dislikes: totalDislikes,
        shares: destination.shares || 0,

        averageRating,
        totalRatings,

        totalComments,
      },
    });
  } catch (error) {
    console.log("GET SINGLE DESTINATION ERROR:");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/*
|--------------------------------------------------------------------------
| UPDATE DESTINATION
|--------------------------------------------------------------------------
*/
export const updateDestination = async (req, res) => {
  try {
    const existingDestination = await Destination.findById(req.params.id);

    if (!existingDestination) {
      return res.status(404).json({
        success: false,
        message: "Destination Not Found",
      });
    }

    const highlights = req.body.highlights
      ? JSON.parse(req.body.highlights)
      : [];

    const bestExperiences = req.body.bestExperiences
  ? JSON.parse(req.body.bestExperiences)
  : existingDestination.bestExperiences;

    const nearbyAttractions = req.body.nearbyAttractions
  ? JSON.parse(req.body.nearbyAttractions)
  : existingDestination.nearbyAttractions;

    let seasonGuide = existingDestination.seasonGuide;

    if (req.body.seasonGuide) {
      seasonGuide = JSON.parse(req.body.seasonGuide);
    }

    const images =
      req.files?.images?.length > 0
        ? req.files.images.map((file) => file.path)
        : existingDestination.images;

    const placeImages =
      req.files?.placeImages?.length > 0
        ? req.files.placeImages.map((file) => file.path)
        : existingDestination.placeImages;

    const bestExperienceFiles = req.files?.bestExperienceImages || [];

    bestExperiences.forEach((experience, index) => {
      experience.image =
        bestExperienceFiles[index]?.path ||
        existingDestination.bestExperiences?.[index]?.image ||
        "";
    });

    const nearbyAttractionFiles = req.files?.nearbyAttractionImages || [];

    nearbyAttractions.forEach((attraction, index) => {
      attraction.image =
        nearbyAttractionFiles[index]?.path ||
        existingDestination.nearbyAttractions?.[index]?.image ||
        "";
    });

    const updateData = {
      name: req.body.name,
      title: req.body.title,
      state: req.body.state,
      city: req.body.city,
      category: req.body.category,
      location: req.body.location,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
      bestTimeToVisit: req.body.bestTimeToVisit,
      entryFee: req.body.entryFee,
      featured: req.body.featured === "true",

      highlights,
      seasonGuide,
      images,
      placeImages,
      bestExperiences,
      nearbyAttractions,
    };

    const updated = await Destination.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Destination Updated Successfully",
      destination: updated,
    });
  } catch (error) {
    console.error("UPDATE DESTINATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE DESTINATION
|--------------------------------------------------------------------------
*/
export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination Not Found",
      });
    }

    await Destination.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
