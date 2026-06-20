import mongoose from "mongoose";

/*
|--------------------------------------------------------------------------
| Nearby Attraction Schema
|--------------------------------------------------------------------------
*/
const nearbyAttractionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    distance: {
      type: String,
      default: "",
    },

    bestTime: {
      type: String,
      default: "",
    },

    highlights: {
      type: [String],
      default: [],
    },

    mapLink: {
      type: String,
      default: "",
    },
  },
  { _id: false },
);

/*
|--------------------------------------------------------------------------
| Best Experience Schema
|--------------------------------------------------------------------------
*/
const bestExperienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },

    subtitle: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    distance: {
      type: String,
      default: "",
    },

    bestTime: {
      type: String,
      default: "",
    },

    duration: {
      type: String,
      default: "",
    },

    offer: {
      type: String,
      default: "",
    },

    highlights: {
      type: [String],
      default: [],
    },

    buttonLink: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

/*
|--------------------------------------------------------------------------
| Destination Schema
|--------------------------------------------------------------------------
*/
const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },
    area:{
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    bestTimeToVisit: {
      type: String,
      required: true,
      trim: true,
    },

    entryFee: {
      type: String,
      required: true,
      trim: true,
    },

    seasonGuide: {
      summer: {
        months: {
          type: String,
          default: "",
        },
        essentials: {
          type: [String],
          default: [],
        },
      },

      monsoon: {
        months: {
          type: String,
          default: "",
        },
        essentials: {
          type: [String],
          default: [],
        },
      },

      winter: {
        months: {
          type: String,
          default: "",
        },
        essentials: {
          type: [String],
          default: [],
        },
      },
    },

    /*
    |--------------------------------------------------------------------------
    | Images
    |--------------------------------------------------------------------------
    */

    images: {
      type: [String],
      default: [],
    },

    placeImages: {
      type: [String],
      default: [],
    },

    /*
    |--------------------------------------------------------------------------
    | Highlights
    |--------------------------------------------------------------------------
    */

    highlights: {
      type: [String],
      default: [],
    },

    /*
    |--------------------------------------------------------------------------
    | Nearby Attractions
    |--------------------------------------------------------------------------
    */

    nearbyAttractions: {
      type: [nearbyAttractionSchema],
      default: [],
    },

    /*
    |--------------------------------------------------------------------------
    | Best Experiences
    |--------------------------------------------------------------------------
    */

    bestExperiences: {
      type: [bestExperienceSchema],
      default: [],
    },

    likes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },

    dislikes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    /*
    |--------------------------------------------------------------------------
    | User Interactions
    |--------------------------------------------------------------------------
    */

    shares: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Destination = mongoose.model("Destination", destinationSchema);
