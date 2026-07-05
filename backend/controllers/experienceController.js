import mongoose from "mongoose";
import { Experience } from "../models/experienceModel.js";
import { Destination } from "../models/destination.js";
import cloudinary from "../config/cloudinary.js";

/*
|--------------------------------------------------------------------------
| Safe JSON Parse
|--------------------------------------------------------------------------
*/
const safeParse = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;

  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn("[safeParse]", error.message);
    return fallback;
  }
};

/*
|--------------------------------------------------------------------------
| Build Cloudinary Image Object
|--------------------------------------------------------------------------
*/
const buildImageObject = (file) => {
  if (!file) return null;

  return {
    url: file.path,
    public_id: file.filename,
  };
};

/*
|--------------------------------------------------------------------------
| Delete Single Cloudinary Image
|--------------------------------------------------------------------------
*/
const deleteCloudinaryImage = async (publicId) => {
  try {
    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("[deleteCloudinaryImage]", error.message);
  }
};

/*
|--------------------------------------------------------------------------
| Delete All Images Of An Experience
|--------------------------------------------------------------------------
*/
const deleteExperienceImages = async (experience) => {
  try {
    for (const image of experience.images || []) {
      await deleteCloudinaryImage(image?.public_id);
    }
  } catch (error) {
    console.error("[deleteExperienceImages]", error.message);
  }
};

/* ============================
   ADD EXPERIENCE
============================ */

export const addExperience = async (req, res) => {
  try {
    let {
      destination,
      title,
      shortDescription,
      description,
      category,
      duration,
      bestTime,
      priceRange,
      difficultyLevel,
      location,
      icon,
      distance,
      highlights,
      tips,
    } = req.body;

    // Parse JSON arrays
    highlights = safeParse(highlights, []);
    tips = safeParse(tips, []);

    // Validate Destination ID format before querying
    if (!destination || !mongoose.Types.ObjectId.isValid(destination)) {
      return res.status(400).json({
        success: false,
        message: "A valid destination is required.",
      });
    }

    // Check Destination
    const destinationExists = await Destination.findById(destination);

    if (!destinationExists) {
      return res.status(404).json({
        success: false,
        message: "Destination not found.",
      });
    }

    /* ---------------------------------------------------------
     * Images
     * -----------------------------------------------------------
     * Stored as { url, public_id } objects — same shape as the
     * destination model — so individual images can actually be
     * targeted for deletion on Cloudinary later (on update/remove/
     * delete), instead of just storing a bare URL string.
     * ---------------------------------------------------------
     */
    const imageFiles = req.files?.images || [];
    const images = imageFiles.map(buildImageObject);

    // Create Experience
    const experience = await Experience.create({
      destination,
      title,
      shortDescription,
      description,
      category,
      duration,
      bestTime,
      priceRange,
      difficultyLevel,
      location,
      icon,
      distance,
      images,
      highlights,
      tips,
    });

    // Save only Experience ID
    destinationExists.bestExperiences.push(experience._id);

    await destinationExists.save();

    return res.status(201).json({
      success: true,
      message: "Experience added successfully.",
      experience,
    });
  } catch (error) {
    console.error("[addExperience]", error);

    const status =
      error.name === "ValidationError" || error.name === "CastError"
        ? 400
        : 500;

    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================
   GET ALL EXPERIENCES
============================ */

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find()
      .populate("destination", "name state city")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: experiences.length,
      experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================
   GET SINGLE EXPERIENCE
============================ */

export const getSingleExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id).populate(
      "destination",
      "name state city",
    );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found.",
      });
    }

    res.status(200).json({
      success: true,
      experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================
   GET EXPERIENCES BY DESTINATION
============================ */

export const getExperiencesByDestination = async (req, res) => {
  try {
    const experiences = await Experience.find({
      destination: req.params.destinationId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: experiences.length,
      experiences,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================
   UPDATE EXPERIENCE
============================ */

export const updateExperience = async (req, res) => {
  try {

    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success:false,
        message:"Experience not found.",
      });
    }

    /* ---------------------------------------------------------
     * Images — keep / remove / add
     * -----------------------------------------------------------
     * Same fix as destinationController: the previous version
     * overwrote `images` with only the newly uploaded files
     * whenever any new file was sent, silently discarding every
     * previously saved image (and leaving it orphaned on
     * Cloudinary — never deleted, just forgotten).
     *
     * Now the client tells us which previously-saved images the
     * user kept (req.body.existingImages, same convention as
     * destinationApi.js's buildFormData). Anything from
     * experience.images that is NOT in that list was deliberately
     * removed, so it gets deleted from Cloudinary. Anything newly
     * uploaded is appended on top. If the client never sends
     * existingImages at all (e.g. an older frontend build), this
     * falls back to keeping everything the experience already had,
     * so nothing is lost.
     * ---------------------------------------------------------
     */

    const existingImages = safeParse(
      req.body.existingImages,
      experience.images
    );

    const keptPublicIds = new Set(
      existingImages
        .map((img) => img?.public_id)
        .filter(Boolean)
    );

    for (const image of experience.images || []) {
      if (image?.public_id && !keptPublicIds.has(image.public_id)) {
        await deleteCloudinaryImage(image.public_id);
      }
    }

    const newImageFiles = req.files?.images || [];

    const images = [
      ...existingImages,
      ...newImageFiles.map(buildImageObject),
    ];

    /* ---------------------------------------------------------
     * Other Fields
     * ---------------------------------------------------------
     */

    const { highlights: rawHighlights, tips: rawTips, existingImages: _omit, ...rest } = req.body;

    const highlights = safeParse(rawHighlights, experience.highlights);
    const tips = safeParse(rawTips, experience.tips);

    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      {
        ...rest,
        images,
        highlights,
        tips,
      },
      {
        new:true,
        runValidators:true,
      }
    );

    res.status(200).json({
      success:true,
      message:"Experience updated successfully.",
      experience:updatedExperience,
    });

  } catch(error){
    console.error("[updateExperience]", error);

    const status =
      error.name === "ValidationError" || error.name === "CastError"
        ? 400
        : 500;

    res.status(status).json({
      success:false,
      message:error.message,
    });

  }
};

/* ============================
   DELETE EXPERIENCE
============================ */

export const deleteExperience = async (req, res) => {
  try {

    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success:false,
        message:"Experience not found.",
      });
    }

    // Remove Experience ID from Destination
    await Destination.findByIdAndUpdate(
      experience.destination,
      {
        $pull:{
          bestExperiences: experience._id,
        },
      }
    );

    /*
    |--------------------------------------------------------------------------
    | Delete Cloudinary Images
    |--------------------------------------------------------------------------
    */
    await deleteExperienceImages(experience);

    // Delete Experience
    await experience.deleteOne();

    res.status(200).json({
      success:true,
      message:"Experience deleted successfully.",
    });

  } catch(error){
    console.error("[deleteExperience]", error);

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};

/* ============================
   DELETE ALL EXPERIENCES
============================ */

export const deleteAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();

    if (experiences.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No experiences found.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Delete Cloudinary Images
    |--------------------------------------------------------------------------
    */
    for (const experience of experiences) {
      await deleteExperienceImages(experience);
    }

    /*
    |--------------------------------------------------------------------------
    | Detach From Destinations
    |--------------------------------------------------------------------------
    */
    await Destination.updateMany(
      {},
      { $set: { bestExperiences: [] } }
    );

    /*
    |--------------------------------------------------------------------------
    | Delete MongoDB Documents
    |--------------------------------------------------------------------------
    */
    const result = await Experience.deleteMany({});

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} experiences deleted successfully.`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("[deleteAllExperiences]", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};