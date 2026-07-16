import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import DestinationFilters, {
  normalizeCategory,
  matchesEntryFee,
  ENTRY_FEE_OPTIONS,
} from "@/components/DestinationListing/DestinationFilters";
import DestinationGrid from "@/components/DestinationListing/DestinationGrid";
import SearchBar from "@/components/DestinationListing/SearchBar";
import SortDropdown from "@/components/DestinationListing/SortDropdown";
import Pagination from "@/components/DestinationListing/Pagination";
import MobileFilterDrawer from "@/components/DestinationListing/MobileFilterDrawer";
import ListingSkeleton from "@/components/DestinationListing/ListingSkeleton";
import Footer from "@/components/Home/Footer";

import api from "@/lib/api";

const ITEMS_PER_PAGE = 9;
const SEARCH_DEBOUNCE_MS = 300;

const DestinationListing = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // `search` is what the input shows; `debouncedSearch` is what filtering
  // actually uses — so fast typing doesn't re-filter the whole list on
  // every keystroke (this was the main source of the lag).
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [entryFeeFilter, setEntryFeeFilter] = useState("all");
  const [freeEntryOnly, setFreeEntryOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const [sortBy, setSortBy] = useState("featured");
  // "Newly added" toggle and the sort dropdown both just set sortBy,
  // so they can never disagree with each other.
  const sortByNewest = sortBy === "newest";
  const setSortByNewest = useCallback(
    (val) => setSortBy(val ? "newest" : "featured"),
    []
  );

  const [currentPage, setCurrentPage] = useState(1);

  const { stateSlug } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const endpoint = stateSlug
        ? `/destinations/state/${stateSlug}`
        : "/destinations";
      const res = await api.get(endpoint);
      setDestinations(res.data.destinations || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [stateSlug]);

  const states = useMemo(
    () => [...new Set(destinations.map((d) => d.state).filter(Boolean))].sort(),
    [destinations]
  );

  // Cities narrow to the selected state (if any) so the list stays short
  // and relevant instead of dumping every city in India up front.
  const cities = useMemo(() => {
    const pool = selectedState
      ? destinations.filter((d) => d.state === selectedState)
      : destinations;
    return [...new Set(pool.map((d) => d.city).filter(Boolean))].sort();
  }, [destinations, selectedState]);

  const areas = useMemo(() => {
    const pool = selectedCity
      ? destinations.filter((d) => d.city === selectedCity)
      : selectedState
      ? destinations.filter((d) => d.state === selectedState)
      : destinations;
    return [...new Set(pool.map((d) => d.area).filter(Boolean))].sort();
  }, [destinations, selectedState, selectedCity]);

  // If the parent filter changes and the child selection no longer
  // exists in that scope, clear it — prevents a "stuck" filter that
  // silently returns zero results.
  useEffect(() => {
    if (selectedCity && !cities.includes(selectedCity)) setSelectedCity("");
  }, [cities, selectedCity]);

  useEffect(() => {
    if (selectedArea && !areas.includes(selectedArea)) setSelectedArea("");
  }, [areas, selectedArea]);

  const filteredDestinations = useMemo(() => {
    let filtered = destinations;

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      filtered = filtered.filter((item) =>
        [item.name, item.state, item.city, item.area, item.category]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    if (selectedState) {
      filtered = filtered.filter((item) => item.state === selectedState);
    }

    if (selectedCity) {
      filtered = filtered.filter((item) => item.city === selectedCity);
    }

    if (selectedArea) {
      filtered = filtered.filter((item) => item.area === selectedArea);
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (item) => normalizeCategory(item.category) === selectedCategory
      );
    }

    if (selectedSeason) {
      filtered = filtered.filter((item) =>
        (item.bestTimeToVisit || "").toLowerCase().includes(selectedSeason)
      );
    }

    if (selectedMonths.length > 0) {
      filtered = filtered.filter((item) => {
        // NOTE: assumes a `bestMonths` array field (e.g. ["Oct","Nov"]).
        // Rename this to match your actual schema if it differs.
        if (Array.isArray(item.bestMonths) && item.bestMonths.length > 0) {
          return item.bestMonths.some((m) => selectedMonths.includes(m));
        }
        return true; // no month data — don't hide it on a guess
      });
    }

    if (minRating > 0) {
      filtered = filtered.filter((item) => (item.rating || 0) >= minRating);
    }

    if (entryFeeFilter !== "all") {
      filtered = filtered.filter((item) => matchesEntryFee(item.entryFee, entryFeeFilter));
    }

    if (freeEntryOnly) {
      filtered = filtered.filter((item) => matchesEntryFee(item.entryFee, "free"));
    }

    if (featuredOnly) {
      filtered = filtered.filter((item) => item.featured);
    }

    const sorted = [...filtered];
    switch (sortBy) {
      case "rating":
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "az":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        sorted.sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1));
    }

    return sorted;
  }, [
    destinations,
    debouncedSearch,
    selectedState,
    selectedCity,
    selectedArea,
    selectedCategory,
    selectedSeason,
    selectedMonths,
    minRating,
    entryFeeFilter,
    freeEntryOnly,
    featuredOnly,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE) || 1;

  const paginatedDestinations = useMemo(
    () =>
      filteredDestinations.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ),
    [filteredDestinations, currentPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearch,
    selectedCategory,
    selectedState,
    selectedCity,
    selectedArea,
    selectedSeason,
    selectedMonths,
    minRating,
    entryFeeFilter,
    freeEntryOnly,
    featuredOnly,
    sortBy,
  ]);

  const activeFilterCount =
    [selectedState, selectedCity, selectedArea, selectedCategory, selectedSeason].filter(Boolean)
      .length +
    (entryFeeFilter !== "all" ? 1 : 0) +
    (selectedMonths.length > 0 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (freeEntryOnly ? 1 : 0) +
    (featuredOnly ? 1 : 0);

  return (
    <div className="min-h-screen dark:bg-slate-800 ">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile filter button */}
        <div className="lg:hidden mb-4">
          <MobileFilterDrawer
            states={states}
            cities={cities}
            areas={areas}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSeason={selectedSeason}
            setSelectedSeason={setSelectedSeason}
            selectedMonths={selectedMonths}
            setSelectedMonths={setSelectedMonths}
            minRating={minRating}
            setMinRating={setMinRating}
            entryFeeFilter={entryFeeFilter}
            setEntryFeeFilter={setEntryFeeFilter}
            freeEntryOnly={freeEntryOnly}
            setFreeEntryOnly={setFreeEntryOnly}
            featuredOnly={featuredOnly}
            setFeaturedOnly={setFeaturedOnly}
            sortByNewest={sortByNewest}
            setSortByNewest={setSortByNewest}
          />
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <DestinationFilters
              states={states}
              cities={cities}
              areas={areas}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSeason={selectedSeason}
              setSelectedSeason={setSelectedSeason}
              selectedMonths={selectedMonths}
              setSelectedMonths={setSelectedMonths}
              minRating={minRating}
              setMinRating={setMinRating}
              entryFeeFilter={entryFeeFilter}
              setEntryFeeFilter={setEntryFeeFilter}
              freeEntryOnly={freeEntryOnly}
              setFreeEntryOnly={setFreeEntryOnly}
              featuredOnly={featuredOnly}
              setFeaturedOnly={setFeaturedOnly}
              sortByNewest={sortByNewest}
              setSortByNewest={setSortByNewest}
            />
          </div>

          {/* Content */}
          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1">
                <SearchBar search={search} setSearch={setSearch} />
              </div>
              <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
            </div>

            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedState && <FilterChip label={selectedState} onClear={() => setSelectedState("")} />}
                {selectedCity && <FilterChip label={selectedCity} onClear={() => setSelectedCity("")} />}
                {selectedArea && <FilterChip label={selectedArea} onClear={() => setSelectedArea("")} />}
                {selectedCategory && (
                  <FilterChip label={selectedCategory} onClear={() => setSelectedCategory("")} />
                )}
                {selectedSeason && (
                  <FilterChip
                    label={selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1)}
                    onClear={() => setSelectedSeason("")}
                  />
                )}
                {selectedMonths.length > 0 && (
                  <FilterChip label={selectedMonths.join(", ")} onClear={() => setSelectedMonths([])} />
                )}
                {minRating > 0 && (
                  <FilterChip label={`${minRating}★ & up`} onClear={() => setMinRating(0)} />
                )}
                {entryFeeFilter !== "all" && (
                  <FilterChip
                    label={ENTRY_FEE_OPTIONS.find((o) => o.value === entryFeeFilter)?.label}
                    onClear={() => setEntryFeeFilter("all")}
                  />
                )}
                {freeEntryOnly && (
                  <FilterChip label="Free entry" onClear={() => setFreeEntryOnly(false)} />
                )}
                {featuredOnly && (
                  <FilterChip label="Featured only" onClear={() => setFeaturedOnly(false)} />
                )}
              </div>
            )}

            <p className="text-sm text-gray-500 mb-4">
              <span className="font-semibold text-gray-900">{filteredDestinations.length}</span>{" "}
              destinations found
            </p>

            {loading ? (
              <ListingSkeleton />
            ) : (
              <>
                <DestinationGrid destinations={paginatedDestinations} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const FilterChip = ({ label, onClear }) => (
  <span className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-700 text-xs px-3 py-1 rounded-full">
    {label}
    <button type="button" onClick={onClear} className="text-orange-400 hover:text-orange-600">
      ×
    </button>
  </span>
);

export default DestinationListing;