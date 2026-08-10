import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getEvents } from "@/services/EventApi";

import Footer from "@/components/Home/Footer";
import SearchBar from "@/components/EventsListing/SearchBar";
import SortDropdown from "@/components/EventsListing/SortDropdown";
import EventGrid from "@/components/EventsListing/EventGrid";
import EventFilters from "@/components/EventsListing/EventFilters";
import Pagination from "@/components/EventsListing/Pagination";
import EventMobileFilterDrawer from "@/components/EventsListing/EventMobileFilterDrawer";

const EVENTS_PER_PAGE = 9;

const EventListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // --------------------------------------------------
  // State
  // --------------------------------------------------

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    category: "all",
    price: "all",
    status: "all",
    featured: "all",
  });

  // --------------------------------------------------
  // URL Parameters
  // --------------------------------------------------

  const searchFromUrl = searchParams.get("search") || "";
  const categoryFromUrl = searchParams.get("category") || "";

  // --------------------------------------------------
  // Fetch Events
  // --------------------------------------------------

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const response = await getEvents();

        console.log("=================================");
        console.log("EVENT API RESPONSE:", response);
        console.log("EVENT COUNT:", response?.count);
        console.log("EVENTS:", response?.events);
        console.log("=================================");

        if (response?.success && Array.isArray(response.events)) {
          setEvents(response.events);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("FETCH EVENTS ERROR:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // --------------------------------------------------
  // Sync URL -> State
  // --------------------------------------------------

  useEffect(() => {
    setSearch(searchFromUrl);

    setFilters((prev) => ({
      ...prev,
      category: categoryFromUrl || "all",
    }));
  }, [searchFromUrl, categoryFromUrl]);

  // --------------------------------------------------
  // Reset pagination whenever filtering changes
  // --------------------------------------------------

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters, sortBy]);

  // --------------------------------------------------
  // Categories
  // --------------------------------------------------

  const categories = useMemo(() => {
    const uniqueCategories = new Set();

    events.forEach((event) => {
      if (event?.category) {
        uniqueCategories.add(event.category);
      }
    });

    return Array.from(uniqueCategories).sort();
  }, [events]);

  // --------------------------------------------------
  // Search Helper
  // --------------------------------------------------

  const matchesSearch = (event, keyword) => {
    if (!keyword) return true;

    const normalizedKeyword = keyword.toLowerCase().trim();

    const searchableFields = [
      event?.title,
      event?.name,
      event?.shortDescription,
      event?.description,
      event?.location,
      event?.city,
      event?.state,
      event?.organizer,
      event?.category,
      event?.venue,
    ];

    return searchableFields.some((field) =>
      String(field || "")
        .toLowerCase()
        .includes(normalizedKeyword),
    );
  };

  // --------------------------------------------------
  // Filter + Search + Sort
  // --------------------------------------------------

  const filteredEvents = useMemo(() => {
    let data = [...events];

    // --------------------------------------------------
    // Search
    // --------------------------------------------------

    if (search.trim()) {
      data = data.filter((event) => matchesSearch(event, search));
    }

    // --------------------------------------------------
    // Category
    // --------------------------------------------------

    if (filters.category !== "all") {
      data = data.filter(
        (event) =>
          String(event?.category || "").toLowerCase() ===
          String(filters.category || "").toLowerCase(),
      );
    }

    // --------------------------------------------------
    // Ticket Price
    // --------------------------------------------------

    if (filters.price === "free") {
      data = data.filter(
        (event) => Number(event?.ticketPrice || 0) === 0,
      );
    }

    if (filters.price === "paid") {
      data = data.filter(
        (event) => Number(event?.ticketPrice || 0) > 0,
      );
    }

    // --------------------------------------------------
    // Featured
    // --------------------------------------------------

    if (filters.featured === "yes") {
      data = data.filter((event) => event?.featured === true);
    }

    if (filters.featured === "no") {
      data = data.filter((event) => event?.featured !== true);
    }

    // --------------------------------------------------
    // Event Status
    // --------------------------------------------------

    if (filters.status !== "all") {
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      data = data.filter((event) => {
        if (!event?.eventDate) {
          return false;
        }

        const eventDate = new Date(event.eventDate);

        if (Number.isNaN(eventDate.getTime())) {
          return false;
        }

        eventDate.setHours(0, 0, 0, 0);

        if (filters.status === "upcoming") {
          return eventDate >= today;
        }

        if (filters.status === "completed") {
          return eventDate < today;
        }

        return true;
      });
    }

    // --------------------------------------------------
    // Sorting
    // --------------------------------------------------

    switch (sortBy) {
      case "oldest":
        data.sort(
          (a, b) =>
            new Date(a?.createdAt || 0) -
            new Date(b?.createdAt || 0),
        );
        break;

      case "date-asc":
        data.sort(
          (a, b) =>
            new Date(a?.eventDate || 0) -
            new Date(b?.eventDate || 0),
        );
        break;

      case "date-desc":
        data.sort(
          (a, b) =>
            new Date(b?.eventDate || 0) -
            new Date(a?.eventDate || 0),
        );
        break;

      case "price-low":
        data.sort(
          (a, b) =>
            Number(a?.ticketPrice || 0) -
            Number(b?.ticketPrice || 0),
        );
        break;

      case "price-high":
        data.sort(
          (a, b) =>
            Number(b?.ticketPrice || 0) -
            Number(a?.ticketPrice || 0),
        );
        break;

      case "title-asc":
        data.sort((a, b) =>
          String(a?.title || "").localeCompare(
            String(b?.title || ""),
          ),
        );
        break;

      case "title-desc":
        data.sort((a, b) =>
          String(b?.title || "").localeCompare(
            String(a?.title || ""),
          ),
        );
        break;

      case "newest":
      default:
        data.sort(
          (a, b) =>
            new Date(b?.createdAt || 0) -
            new Date(a?.createdAt || 0),
        );
        break;
    }

    return data;
  }, [events, search, filters, sortBy]);

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const totalPages = Math.ceil(
    filteredEvents.length / EVENTS_PER_PAGE,
  );

  const currentEvents = useMemo(() => {
    const startIndex =
      (currentPage - 1) * EVENTS_PER_PAGE;

    return filteredEvents.slice(
      startIndex,
      startIndex + EVENTS_PER_PAGE,
    );
  }, [filteredEvents, currentPage]);

  // --------------------------------------------------
  // Active Filter Count
  // --------------------------------------------------

  const priceLabels = {
    free: "Free Events",
    paid: "Paid Events",
  };

  const statusLabels = {
    upcoming: "Upcoming",
    completed: "Completed",
  };

  const featuredLabels = {
    yes: "Featured Only",
    no: "Non Featured",
  };

  const activeFilterCount =
    (filters.category !== "all" ? 1 : 0) +
    (filters.price !== "all" ? 1 : 0) +
    (filters.status !== "all" ? 1 : 0) +
    (filters.featured !== "all" ? 1 : 0);

  // --------------------------------------------------
  // Search Input Handler
  // --------------------------------------------------

  const handleSearchChange = (value) => {
    setSearch(value);

    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  };

  // --------------------------------------------------
  // Clear Search
  // --------------------------------------------------

  const handleClearSearch = () => {
    setSearch("");

    const params = new URLSearchParams(searchParams);

    params.delete("search");

    setSearchParams(params);
  };

  // --------------------------------------------------
  // Clear Category
  // --------------------------------------------------

  const clearCategory = () => {
    setFilters((prev) => ({
      ...prev,
      category: "all",
    }));

    const params = new URLSearchParams(searchParams);

    params.delete("category");

    setSearchParams(params);
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <main className="container mx-auto px-4 py-10 lg:px-6">

        {/* --------------------------------------------------
            Heading
        -------------------------------------------------- */}

        <div className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
            Explore Events
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-6 text-gray-600 dark:text-slate-400">
            Discover cultural festivals, adventure events,
            local celebrations, exhibitions, fairs, music
            festivals, food festivals and much more across
            India.
          </p>
        </div>

        {/* --------------------------------------------------
            Mobile Filter
        -------------------------------------------------- */}

        <div className="mb-4 lg:hidden">
          <EventMobileFilterDrawer
            filters={filters}
            setFilters={setFilters}
            categories={categories}
          />
        </div>

        {/* --------------------------------------------------
            Main Layout
        -------------------------------------------------- */}

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">

          {/* --------------------------------------------------
              Sidebar
          -------------------------------------------------- */}

          <div className="hidden lg:block">
            <EventFilters
              filters={filters}
              setFilters={setFilters}
              categories={categories}
            />
          </div>

          {/* --------------------------------------------------
              Content
          -------------------------------------------------- */}

          <div>

            {/* Search + Sort */}

            <div className="mb-4 flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <SearchBar
                  value={search}
                  onChange={handleSearchChange}
                  onClear={handleClearSearch}
                />
              </div>

              <SortDropdown
                value={sortBy}
                onChange={setSortBy}
              />
            </div>

            {/* --------------------------------------------------
                Active Filter Chips
            -------------------------------------------------- */}

            {activeFilterCount > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">

                {/* Category */}

                {filters.category !== "all" && (
                  <FilterChip
                    label={filters.category}
                    onClear={clearCategory}
                  />
                )}

                {/* Price */}

                {filters.price !== "all" && (
                  <FilterChip
                    label={priceLabels[filters.price]}
                    onClear={() =>
                      setFilters((prev) => ({
                        ...prev,
                        price: "all",
                      }))
                    }
                  />
                )}

                {/* Status */}

                {filters.status !== "all" && (
                  <FilterChip
                    label={statusLabels[filters.status]}
                    onClear={() =>
                      setFilters((prev) => ({
                        ...prev,
                        status: "all",
                      }))
                    }
                  />
                )}

                {/* Featured */}

                {filters.featured !== "all" && (
                  <FilterChip
                    label={featuredLabels[filters.featured]}
                    onClear={() =>
                      setFilters((prev) => ({
                        ...prev,
                        featured: "all",
                      }))
                    }
                  />
                )}

              </div>
            )}

            {/* --------------------------------------------------
                Search Information
            -------------------------------------------------- */}

            {search && !loading && (
              <div className="mb-3 text-sm text-gray-500 dark:text-slate-400">
                Search results for{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  "{search}"
                </span>
              </div>
            )}

            {/* --------------------------------------------------
                Result Count
            -------------------------------------------------- */}

            {!loading && (
              <p className="mb-4 text-sm text-gray-500 dark:text-slate-400">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {filteredEvents.length}
                </span>{" "}
                {filteredEvents.length === 1
                  ? "event"
                  : "events"}{" "}
                found
              </p>
            )}

            {/* --------------------------------------------------
                Event Grid
            -------------------------------------------------- */}

            <EventGrid
              events={currentEvents}
              loading={loading}
            />

            {/* --------------------------------------------------
                Empty Search State
            -------------------------------------------------- */}

            {!loading && filteredEvents.length === 0 && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-12 text-center dark:border-slate-800 dark:bg-slate-900">
                <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  No events found
                </h2>

                {search ? (
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    No events match "{search}".
                    Try another event name, location,
                    category, or keyword.
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    No events match the selected filters.
                  </p>
                )}

                {(search || activeFilterCount > 0) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setFilters({
                        category: "all",
                        price: "all",
                        status: "all",
                        featured: "all",
                      });

                      setSearchParams({});
                    }}
                    className="mt-5 rounded-lg bg-orange-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}

            {/* --------------------------------------------------
                Pagination
            -------------------------------------------------- */}

            {!loading &&
              filteredEvents.length > 0 &&
              totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// --------------------------------------------------
// Filter Chip
// --------------------------------------------------

const FilterChip = ({ label, onClear }) => {
  return (
    <div className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-sm text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-300">
      <span>{label}</span>

      <button
        type="button"
        onClick={onClear}
        aria-label={`Remove ${label} filter`}
        className="flex h-5 w-5 items-center justify-center rounded-full text-orange-600 transition hover:bg-orange-200 dark:text-orange-300 dark:hover:bg-orange-500/20"
      >
        ×
      </button>
    </div>
  );
};

export default EventListing;