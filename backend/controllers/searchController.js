import { Destination } from "../models/destination.js";

/*
 * =========================================================
 * ESCAPE REGEX
 * =========================================================
 */

const escapeRegex = (value = "") => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

/*
 * =========================================================
 * NORMALIZE VALUE
 * =========================================================
 */

const normalize = (value = "") => {
  return String(value).trim();
};

/*
 * =========================================================
 * BUILD DESTINATION QUERY
 * =========================================================
 */

const buildDestinationQuery = ({
  state = "",
  city = "",
  category = "",
  search = "",
}) => {
  const query = {};

  const cleanState = normalize(state);
  const cleanCity = normalize(city);
  const cleanCategory = normalize(category);
  const cleanSearch = normalize(search);

  /*
   * STATE
   */

  if (cleanState) {
    query.state = {
      $regex: `^${escapeRegex(cleanState)}$`,
      $options: "i",
    };
  }

  /*
   * CITY
   */

  if (cleanCity) {
    query.city = {
      $regex: `^${escapeRegex(cleanCity)}$`,
      $options: "i",
    };
  }

  /*
   * CATEGORY
   *
   * Works with both:
   *
   * category: "Heritage"
   *
   * and:
   *
   * category: ["Heritage", "Adventure"]
   */

  if (cleanCategory) {
    query.category = {
      $regex: `^${escapeRegex(cleanCategory)}$`,
      $options: "i",
    };
  }

  /*
   * DESTINATION SEARCH
   *
   * Search only inside the currently selected
   * State / City / Category context.
   */

  if (cleanSearch) {
    query.name = {
      $regex: escapeRegex(cleanSearch),
      $options: "i",
    };
  }

  return query;
};

/*
 * =========================================================
 * SEARCH DESTINATIONS
 * =========================================================
 *
 * Flow:
 *
 * State
 *   ↓
 * City
 *   ↓
 * Category
 *   ↓
 * Destination
 *
 * All filters are combined.
 */

export const searchDestination = async (req, res) => {
  try {
    const {
      state = "",
      city = "",
      category = "",
      search = "",
    } = req.body || {};

    const query = buildDestinationQuery({
      state,
      city,
      category,
      search,
    });

    const destinations = await Destination.find(query)
      .sort({ name: 1 })
      .lean();

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
 * GET CASCADING SEARCH OPTIONS
 * =========================================================
 *
 * IMPORTANT:
 *
 * This endpoint is now CONTEXT AWARE.
 *
 * No state:
 *   → all states
 *
 * State selected:
 *   → cities only from that state
 *
 * State + City selected:
 *   → categories only from that state + city
 *
 * State + City + Category selected:
 *   → destinations only from that combination
 */

export const getSearchOptions = async (req, res) => {
  try {
    const {
      state = "",
      city = "",
      category = "",
    } = req.query || {};

    const cleanState = normalize(state);
    const cleanCity = normalize(city);
    const cleanCategory = normalize(category);

    /*
     * -------------------------------------------------------
     * STATES
     * -------------------------------------------------------
     *
     * States are always global because State is the
     * first level of the search hierarchy.
     */

    const stateDocuments = await Destination.find({})
      .select("state")
      .lean();

    const states = [
      ...new Set(
        stateDocuments
          .map((item) => normalize(item.state))
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b));

    /*
     * -------------------------------------------------------
     * BUILD CONTEXT QUERY
     * -------------------------------------------------------
     */

    const contextQuery = {};

    /*
     * State selected
     */

    if (cleanState) {
      contextQuery.state = {
        $regex: `^${escapeRegex(cleanState)}$`,
        $options: "i",
      };
    }

    /*
     * City selected
     */

    if (cleanCity) {
      contextQuery.city = {
        $regex: `^${escapeRegex(cleanCity)}$`,
        $options: "i",
      };
    }

    /*
     * Category selected
     */

    if (cleanCategory) {
      contextQuery.category = {
        $regex: `^${escapeRegex(cleanCategory)}$`,
        $options: "i",
      };
    }

    /*
     * -------------------------------------------------------
     * CITIES
     * -------------------------------------------------------
     *
     * If state is selected:
     *
     * only cities belonging to that state.
     *
     * Otherwise:
     *
     * all cities.
     */

    const cityDocuments = await Destination.find(
      cleanState
        ? {
            state: {
              $regex: `^${escapeRegex(cleanState)}$`,
              $options: "i",
            },
          }
        : {}
    )
      .select("city")
      .lean();

    const cities = [
      ...new Set(
        cityDocuments
          .map((item) => normalize(item.city))
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b));

    /*
     * -------------------------------------------------------
     * CATEGORIES
     * -------------------------------------------------------
     *
     * This is the important fix.
     *
     * Category is calculated AFTER applying:
     *
     * State
     * +
     * City
     *
     * Therefore:
     *
     * Kolkata
     *   → Kolkata categories only
     */

    const categoryDocuments = await Destination.find(
      cleanState || cleanCity
        ? {
            ...(cleanState && {
              state: {
                $regex: `^${escapeRegex(cleanState)}$`,
                $options: "i",
              },
            }),

            ...(cleanCity && {
              city: {
                $regex: `^${escapeRegex(cleanCity)}$`,
                $options: "i",
              },
            }),
          }
        : {}
    )
      .select("category")
      .lean();

    const categorySet = new Set();

    categoryDocuments.forEach((item) => {
      if (Array.isArray(item.category)) {
        item.category.forEach((categoryItem) => {
          const value = normalize(categoryItem);

          if (value) {
            categorySet.add(value);
          }
        });
      } else {
        const value = normalize(item.category);

        if (value) {
          categorySet.add(value);
        }
      }
    });

    const categories = [...categorySet].sort((a, b) =>
      a.localeCompare(b)
    );

    /*
     * -------------------------------------------------------
     * DESTINATIONS
     * -------------------------------------------------------
     *
     * These are calculated using:
     *
     * State
     * City
     * Category
     *
     * So the destination dropdown is also fully cascading.
     */

    const destinationDocuments = await Destination.find(
      contextQuery
    )
      .select("name state city category")
      .sort({ name: 1 })
      .lean();

    const destinations = [
      ...new Set(
        destinationDocuments
          .map((item) => normalize(item.name))
          .filter(Boolean)
      ),
    ];

    /*
     * -------------------------------------------------------
     * RESPONSE
     * -------------------------------------------------------
     */

    return res.status(200).json({
      success: true,

      states,

      cities,

      categories,

      destinations,
    });
  } catch (error) {
    console.error("Get search options error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};