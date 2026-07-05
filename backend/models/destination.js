import mongoose from "mongoose";

/*
|--------------------------------------------------------------------------
| Nearby Attraction Schema
|--------------------------------------------------------------------------
*/
const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      default: "",
    },
    public_id: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);



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
      type: imageSchema,
      default: {},
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
  { _id: false }
);

/*
|--------------------------------------------------------------------------
| Destination Schema
|--------------------------------------------------------------------------
*/

const destinationSchema = new mongoose.Schema(
  {
    /*
    |--------------------------------------------------------------------------
    | Basic Information
    |--------------------------------------------------------------------------
    */

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

    area: {
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
    /*
    |--------------------------------------------------------------------------
    | Travel Information
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | Season Guide
    |--------------------------------------------------------------------------
    */

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
      type: [imageSchema],
      default: [],
    },

    placeImages: {
      type: [imageSchema],
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
    | Best Experiences (Referenced)
    |--------------------------------------------------------------------------
    */

    bestExperiences: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Experience",
      },
    ],

    /*
    |--------------------------------------------------------------------------
    | User Reactions
    |--------------------------------------------------------------------------
    */

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    /*
    |--------------------------------------------------------------------------
    | Statistics
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
  }
);

export const Destination = mongoose.model(
  "Destination",
  destinationSchema
);