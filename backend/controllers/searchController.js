import { Destination } from "../models/destination.js";

// Escape user input before using it inside MongoDB regex
const escapeRegex = (value = "") => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const searchDestination = async (req, res) => {
  try {
    const { state = "", city = "", category = "", search = "" } =
      req.body || {};

    /*
     * ---------------------------------------------------------
     * BUILD MONGODB QUERY
     * ---------------------------------------------------------
     */

    const query = {};

    /*
     * STATE
     */
    if (state.trim()) {
      query.state = {
        $regex: state.trim(),
        $options: "i",
      };
    }

    /*
     * CITY
     */
    if (city.trim()) {
      query.city = {
        $regex: city.trim(),
        $options: "i",
      };
    }

    /*
     * CATEGORY
     */
    if (category.trim()) {
      query.category = {
        $regex: category.trim(),
        $options: "i",
      };
    }

    /*
     * DESTINATION SEARCH
     *
     * Search destination name, city or state.
     *
     * Category/state/city filters above are still applied.
     */
    if (search.trim()) {
      query.$or = [
        {
          name: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          city: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          state: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    /*
     * ---------------------------------------------------------
     * GET DESTINATIONS FROM MONGODB
     * ---------------------------------------------------------
     *
     * This is the important part:
     * Search results always come from the current MongoDB data.
     */

    const destinations = await Destination.find(query)
      .sort({ name: 1 })
      .lean();

    /*
     * ---------------------------------------------------------
     * RETURN RESULTS
     * ---------------------------------------------------------
     */

    return res.status(200).json({
      success: true,
      total: destinations.length,
      destinations,
    });
  } catch (error) {
    console.error("Search destination error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
 * =========================================================
 * GET SEARCH OPTIONS
 * =========================================================
 *
 * This endpoint provides State, City and Category options
 * directly from MongoDB.
 *
 * Therefore SearchBox does NOT depend on old states.js data.
 */

export const getSearchOptions = async (req, res) => {
  try {
    const destinations = await Destination.find({})
      .select("state city category")
      .lean();

    /*
     * STATES
     */

    const states = [
      ...new Set(
        destinations
          .map((item) => item.state?.trim())
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b));

    /*
     * CITIES
     */

    const cities = [
      ...new Set(
        destinations
          .map((item) => item.city?.trim())
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b));

    /*
     * CATEGORIES
     *
     * Handles both:
     *
     * category: "Hill Station"
     *
     * and, if your MongoDB has:
     *
     * category: ["Hill Station", "Adventure"]
     */

    const categorySet = new Set();

    destinations.forEach((item) => {
      if (Array.isArray(item.category)) {
        item.category.forEach((category) => {
          if (category?.trim()) {
            categorySet.add(category.trim());
          }
        });
      } else if (item.category?.trim()) {
        categorySet.add(item.category.trim());
      }
    });

    const categories = [...categorySet].sort((a, b) =>
      a.localeCompare(b)
    );

    return res.status(200).json({
      success: true,
      states,
      cities,
      categories,
    });
  } catch (error) {
    console.error("Get search options error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};