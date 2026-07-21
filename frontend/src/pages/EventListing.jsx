import React, { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("newest");

  const [currentPage, setCurrentPage] = useState(1);

  const categoryFromUrl = searchParams.get("category") || "";
  const searchFromUrl = searchParams.get("search") || "";

  const [filters, setFilters] = useState({
    category: "all",
    price: "all",
    status: "all",
    featured: "all",
  });

  /*
  |--------------------------------------------------------------------------
  | Fetch Events
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (categoryFromUrl) {
      setFilters((prev) => ({
        ...prev,
        category: categoryFromUrl,
      }));
    }

    if (searchFromUrl) {
      setSearch(searchFromUrl);
    }
  }, [categoryFromUrl, searchFromUrl]);
  /*
  |--------------------------------------------------------------------------
  | Reset Pagination
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters, sortBy]);

  /*
  |--------------------------------------------------------------------------
  | Categories
  |--------------------------------------------------------------------------
  */

  const categories = useMemo(() => {
    return [
      ...new Set(events.map((event) => event.category).filter(Boolean)),
    ].sort();
  }, [events]);

  /*
  |--------------------------------------------------------------------------
  | Filter + Search + Sort
  |--------------------------------------------------------------------------
  */

  const filteredEvents = useMemo(() => {
    let data = [...events];

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    if (search.trim()) {
      const keyword = search.toLowerCase();

      data = data.filter((event) => {
        return (
          event.title?.toLowerCase().includes(keyword) ||
          event.shortDescription?.toLowerCase().includes(keyword) ||
          event.location?.toLowerCase().includes(keyword) ||
          event.organizer?.toLowerCase().includes(keyword) ||
          event.category?.toLowerCase().includes(keyword)
        );
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Category
    |--------------------------------------------------------------------------
    */

    if (filters.category !== "all") {
      data = data.filter((event) => event.category === filters.category);
    }

    /*
    |--------------------------------------------------------------------------
    | Ticket Price
    |--------------------------------------------------------------------------
    */

    if (filters.price === "free") {
      data = data.filter((event) => Number(event.ticketPrice || 0) === 0);
    }

    if (filters.price === "paid") {
      data = data.filter((event) => Number(event.ticketPrice || 0) > 0);
    }

    /*
    |--------------------------------------------------------------------------
    | Featured
    |--------------------------------------------------------------------------
    */

    if (filters.featured === "yes") {
      data = data.filter((event) => event.featured);
    }

    if (filters.featured === "no") {
      data = data.filter((event) => !event.featured);
    }

    /*
    |--------------------------------------------------------------------------
    | Event Status
    |--------------------------------------------------------------------------
    */

    if (filters.status !== "all") {
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      data = data.filter((event) => {
        if (!event.eventDate) return false;

        const eventDate = new Date(event.eventDate);

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

    /*
    |--------------------------------------------------------------------------
    | Sorting
    |--------------------------------------------------------------------------
    */

    switch (sortBy) {
      case "oldest":
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;

      case "date-asc":
        data.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
        break;

      case "date-desc":
        data.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
        break;

      case "price-low":
        data.sort(
          (a, b) => Number(a.ticketPrice || 0) - Number(b.ticketPrice || 0),
        );
        break;

      case "price-high":
        data.sort(
          (a, b) => Number(b.ticketPrice || 0) - Number(a.ticketPrice || 0),
        );
        break;

      case "title-asc":
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "title-desc":
        data.sort((a, b) => b.title.localeCompare(a.title));
        break;

      case "newest":
      default:
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return data;
  }, [events, search, filters, sortBy]);

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  const currentEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;

    return filteredEvents.slice(startIndex, startIndex + EVENTS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  /*
  |--------------------------------------------------------------------------
  | Active filter chips (presentational only — derived from existing state)
  |--------------------------------------------------------------------------
  */

  const priceLabels = { free: "Free Events", paid: "Paid Events" };
  const statusLabels = { upcoming: "Upcoming", completed: "Completed" };
  const featuredLabels = { yes: "Featured Only", no: "Non Featured" };

  const activeFilterCount =
    (filters.category !== "all" ? 1 : 0) +
    (filters.price !== "all" ? 1 : 0) +
    (filters.status !== "all" ? 1 : 0) +
    (filters.featured !== "all" ? 1 : 0);

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-orange-50/40 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Heading */}

        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Explore Events
          </h1>

          <p className="max-w-2xl mx-auto text-sm text-gray-600 dark:text-slate-400 leading-6">
            Discover cultural festivals, adventure events, local celebrations,
            exhibitions, fairs, music festivals, food festivals and much more
            across India.
          </p>
        </div>

        {/* Mobile Filter */}

        <div className="lg:hidden mb-4">
          <EventMobileFilterDrawer
            filters={filters}
            setFilters={setFilters}
            categories={categories}
          />
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}

          <div className="hidden lg:block">
            <EventFilters
              filters={filters}
              setFilters={setFilters}
              categories={categories}
            />
          </div>

          {/* Content */}

          <div>
            {/* Search + Sort */}

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1">
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  onClear={() => setSearch("")}
                />
              </div>

              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            {/* Active filter chips */}

            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {filters.category !== "all" && (
                  <FilterChip
                    label={filters.category}
                    onClear={() =>
                      setFilters((prev) => ({ ...prev, category: "all" }))
                    }
                  />
                )}

                {filters.price !== "all" && (
                  <FilterChip
                    label={priceLabels[filters.price]}
                    onClear={() =>
                      setFilters((prev) => ({ ...prev, price: "all" }))
                    }
                  />
                )}

                {filters.status !== "all" && (
                  <FilterChip
                    label={statusLabels[filters.status]}
                    onClear={() =>
                      setFilters((prev) => ({ ...prev, status: "all" }))
                    }
                  />
                )}

                {filters.featured !== "all" && (
                  <FilterChip
                    label={featuredLabels[filters.featured]}
                    onClear={() =>
                      setFilters((prev) => ({ ...prev, featured: "all" }))
                    }
                  />
                )}
              </div>
            )}

            {/* Result Count */}

            {!loading && (
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {filteredEvents.length}
                </span>{" "}
                {filteredEvents.length === 1 ? "event" : "events"} found
              </p>
            )}

            {/* Grid */}

            <EventGrid events={currentEvents} loading={loading} />

            {/* Pagination */}

            {!loading && filteredEvents.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const FilterChip = ({ label, onClear }) => (
  <span className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-700 dark:text-orange-400 text-xs px-3 py-1 rounded-full">
    {label}
    <button
      type="button"
      onClick={onClear}
      className="text-orange-400 hover:text-orange-600 dark:hover:text-orange-300"
    >
      ×
    </button>
  </span>
);

export default EventListing;
