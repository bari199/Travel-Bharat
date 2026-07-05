import { Destination } from "../models/destination.js";
import cloudinary from "../config/cloudinary.js";

/*
|--------------------------------------------------------------------------
| Safe JSON Parse
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
    console.error(
      "[deleteCloudinaryImage]",
      error.message
    );
  }
};

/*
|--------------------------------------------------------------------------
| Delete All Images Of Destination
|--------------------------------------------------------------------------
*/
const deleteDestinationImages = async (
  destination
) => {
  try {
    /*
    |--------------------------------------------------------------------------
    | Main Images
    |--------------------------------------------------------------------------
    */
    for (const image of destination.images || []) {
      await deleteCloudinaryImage(
        image.public_id
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Place Images
    |--------------------------------------------------------------------------
    */
    for (const image of destination.placeImages || []) {
      await deleteCloudinaryImage(
        image.public_id
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Nearby Attraction Images
    |--------------------------------------------------------------------------
    */
    for (
      const attraction of destination.nearbyAttractions || []
    ) {
      if (attraction.image?.public_id) {
        await deleteCloudinaryImage(
          attraction.image.public_id
        );
      }
    }
  } catch (error) {
    console.error(
      "[deleteDestinationImages]",
      error.message
    );
  }
};


/*
|--------------------------------------------------------------------------
| ADD DESTINATION
| POST /api/destinations
|--------------------------------------------------------------------------
*/

export const addDestination = async (req, res) => {
  try {
    console.log("[addDestination] BODY:", req.body);
    console.log("[addDestination] FILES:", req.files);

    /* ---------------------------------------------------------
     * Parse JSON Fields
     * ---------------------------------------------------------
     */

    const highlights = safeParse(req.body.highlights, []);

    const seasonGuide = safeParse(req.body.seasonGuide, {
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
    });

    const bestExperiences = safeParse(
      req.body.bestExperiences,
      []
    );

    const nearbyAttractions = safeParse(
      req.body.nearbyAttractions,
      []
    );

    /* ---------------------------------------------------------
     * Uploaded Files
     * ---------------------------------------------------------
     */

    const imageFiles =
      req.files?.images || [];

    const placeImageFiles =
      req.files?.placeImages || [];

    const nearbyImageFiles =
      req.files?.nearbyAttractionImages || [];

    /* ---------------------------------------------------------
     * Destination Images
     * ---------------------------------------------------------
     */

    const images = imageFiles.map(
      buildImageObject
    );

    const placeImages =
      placeImageFiles.map(
        buildImageObject
      );

    /* ---------------------------------------------------------
     * Nearby Attraction Images
     * ---------------------------------------------------------
     */

    nearbyAttractions.forEach(
      (attraction, index) => {
        attraction.image =
          buildImageObject(
            nearbyImageFiles[index]
          ) || {};
      }
    );

    /* ---------------------------------------------------------
     * Create Destination
     * ---------------------------------------------------------
     */

    const destination =
      await Destination.create({
        name: req.body.name,
        title: req.body.title,
        state: req.body.state,
        city: req.body.city,
        category: req.body.category,
        location: req.body.location,
        area: req.body.area,

        shortDescription:
          req.body.shortDescription,

        description:
          req.body.description,

        bestTimeToVisit:
          req.body.bestTimeToVisit,

        entryFee:
          req.body.entryFee,

        featured:
          req.body.featured ===
          "true",

        seasonGuide,

        highlights,

        images,

        placeImages,

        nearbyAttractions,

        /*
        |--------------------------------------------------------------------------
        | Keep Experiences Same
        |--------------------------------------------------------------------------
        */

        bestExperiences,
      });

    return res.status(201).json({
      success: true,
      message:
        "Destination added successfully.",
      destination,
    });
  } catch (error) {
    console.error(
      "[addDestination]",
      error
    );

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
    const destinations = await Destination.find().populate("bestExperiences");

    return res.status(200).json({
      success: true,
      count: destinations.length,
      destinations,
    });
  } catch (error) {
    console.error("[getDestinations]", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/*
|--------------------------------------------------------------------------
| GET DESTINATIONS BY STATE
|--------------------------------------------------------------------------
*/

export const getDestinationsByState = async (
  req,
  res
) => {
  try {
    const { stateSlug } = req.params;

    const stateName = stateSlug
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");

    const destinations =
      await Destination.find({
        state: {
          $regex: new RegExp(
            `^${stateName}$`,
            "i"
          ),
        },
      });

    return res.status(200).json({
      success: true,
      count: destinations.length,
      destinations,
    });
  } catch (error) {
    console.error(
      "[getDestinationsByState]",
      error
    );

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

export const getSingleDestination = async (
  req,
  res
) => {
  try {
    const destination =
      await Destination.findById(
        req.params.id
      ).populate("bestExperiences");

    if (!destination) {
      return res.status(404).json({
        success: false,
        message:
          "Destination not found.",
      });
    }

    return res.status(200).json({
      success: true,
      destination,

      stats: {
        likes:
          destination.likes?.length ||
          0,

        dislikes:
          destination.dislikes
            ?.length || 0,

        shares:
          destination.shares || 0,

        rating:
          destination.rating || 0,
      },
    });
  } catch (error) {
    console.error(
      "[getSingleDestination]",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/*
|--------------------------------------------------------------------------
| UPDATE DESTINATION
| PUT /api/destinations/:id
|--------------------------------------------------------------------------
*/

export const updateDestination = async (req, res) => {
  try {
    console.log("[updateDestination] BODY:", req.body);
    console.log("[updateDestination] FILES:", req.files);

    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    /* ---------------------------------------------------------
     * Parse JSON
     * ---------------------------------------------------------
     */

    const highlights = safeParse(
      req.body.highlights,
      destination.highlights
    );

    const nearbyAttractions = safeParse(
      req.body.nearbyAttractions,
      destination.nearbyAttractions
    );

    const seasonGuide = req.body.seasonGuide
      ? safeParse(
          req.body.seasonGuide,
          destination.seasonGuide
        )
      : destination.seasonGuide;

    /* ---------------------------------------------------------
     * Uploaded Files
     * ---------------------------------------------------------
     */

    const imageFiles =
      req.files?.images || [];

    const placeImageFiles =
      req.files?.placeImages || [];

    const nearbyImageFiles =
      req.files?.nearbyAttractionImages || [];

    /* ---------------------------------------------------------
     * Main Images
     * -----------------------------------------------------------
     * The client tells us which previously-saved images the user
     * kept (req.body.existingImages). Anything that was on the
     * destination before but is NOT in that list was deliberately
     * removed by the user, so we delete it from Cloudinary.
     * Anything newly uploaded (imageFiles) gets appended on top.
     *
     * NOTE: this replaces the old behavior where uploading a new
     * image would wipe out every previously saved image (because
     * it unconditionally deleted destination.images and kept only
     * the freshly uploaded files), and removing an image without
     * uploading a new one did nothing at all.
     * ---------------------------------------------------------
     */

    const existingImages = safeParse(
      req.body.existingImages,
      destination.images
    );

    const keptImagePublicIds = new Set(
      existingImages
        .map((img) => img?.public_id)
        .filter(Boolean)
    );

    for (const image of destination.images || []) {
      if (
        image?.public_id &&
        !keptImagePublicIds.has(image.public_id)
      ) {
        await deleteCloudinaryImage(
          image.public_id
        );
      }
    }

    const images = [
      ...existingImages,
      ...imageFiles.map(buildImageObject),
    ];

    /* ---------------------------------------------------------
     * Place Images
     * (same keep/remove/add logic as Main Images above)
     * ---------------------------------------------------------
     */

    const existingPlaceImages = safeParse(
      req.body.existingPlaceImages,
      destination.placeImages
    );

    const keptPlaceImagePublicIds = new Set(
      existingPlaceImages
        .map((img) => img?.public_id)
        .filter(Boolean)
    );

    for (const image of destination.placeImages || []) {
      if (
        image?.public_id &&
        !keptPlaceImagePublicIds.has(image.public_id)
      ) {
        await deleteCloudinaryImage(
          image.public_id
        );
      }
    }

    const placeImages = [
      ...existingPlaceImages,
      ...placeImageFiles.map(buildImageObject),
    ];

    /* ---------------------------------------------------------
     * Nearby Attractions
     * ---------------------------------------------------------
     */

    nearbyAttractions.forEach(
      (attraction, index) => {
        if (
          nearbyImageFiles[index]
        ) {
          if (
            destination
              .nearbyAttractions?.[
              index
            ]?.image?.public_id
          ) {
            deleteCloudinaryImage(
              destination
                .nearbyAttractions[
                index
              ].image.public_id
            );
          }

          attraction.image =
            buildImageObject(
              nearbyImageFiles[
                index
              ]
            );
        } else {
          attraction.image =
            destination
              .nearbyAttractions?.[
              index
            ]?.image || {};
        }
      }
    );

    /* ---------------------------------------------------------
     * Update
     * ---------------------------------------------------------
     */

    destination.name =
      req.body.name ??
      destination.name;

    destination.title =
      req.body.title ??
      destination.title;

    destination.state =
      req.body.state ??
      destination.state;

    destination.city =
      req.body.city ??
      destination.city;

    destination.category =
      req.body.category ??
      destination.category;

    destination.location =
      req.body.location ??
      destination.location;

    destination.area =
      req.body.area ??
      destination.area;

    destination.shortDescription =
      req.body.shortDescription ??
      destination.shortDescription;

    destination.description =
      req.body.description ??
      destination.description;

    destination.bestTimeToVisit =
      req.body.bestTimeToVisit ??
      destination.bestTimeToVisit;

    destination.entryFee =
      req.body.entryFee ??
      destination.entryFee;

    destination.featured =
      req.body.featured !==
      undefined
        ? req.body.featured ===
          "true"
        : destination.featured;

    destination.highlights =
      highlights;

    destination.seasonGuide =
      seasonGuide;

    destination.images =
      images;

    destination.placeImages =
      placeImages;

    destination.nearbyAttractions =
      nearbyAttractions;

    await destination.save();

    return res.status(200).json({
      success: true,
      message:
        "Destination updated successfully.",
      destination,
    });
  } catch (error) {
    console.error(
      "[updateDestination]",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE DESTINATION
| DELETE /api/destinations/:id
|--------------------------------------------------------------------------
*/

export const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;

    const destination = await Destination.findById(id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Delete Cloudinary Images
    |--------------------------------------------------------------------------
    */

    await deleteDestinationImages(destination);

    /*
    |--------------------------------------------------------------------------
    | Delete Destination
    |--------------------------------------------------------------------------
    */

    await Destination.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message:
        "Destination deleted successfully.",
    });
  } catch (error) {
    console.error(
      "[deleteDestination]",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/*
|--------------------------------------------------------------------------
| DELETE ALL DESTINATIONS
| DELETE /api/destinations/delete-all
|--------------------------------------------------------------------------
*/

export const deleteAllDestinations = async (
  req,
  res
) => {
  try {
    const destinations =
      await Destination.find();

    if (
      destinations.length === 0
    ) {
      return res.status(404).json({
        success: false,
        message:
          "No destinations found.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Delete Cloudinary Images
    |--------------------------------------------------------------------------
    */

    for (const destination of destinations) {
      await deleteDestinationImages(
        destination
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Delete MongoDB Documents
    |--------------------------------------------------------------------------
    */

    const result =
      await Destination.deleteMany(
        {}
      );

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} destinations deleted successfully.`,
      deletedCount:
        result.deletedCount,
    });
  } catch (error) {
    console.error(
      "[deleteAllDestinations]",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};