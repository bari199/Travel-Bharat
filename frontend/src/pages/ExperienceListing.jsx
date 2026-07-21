import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ExperienceFilters, {
  normalizeCategory,
  matchesPriceRange,
  PRICE_RANGE_OPTIONS,
} from "@/components/ExperiencesListing/ExperienceFilters";
import ExperienceGrid from "@/components/ExperiencesListing/ExperienceGrid";
import SearchBar from "@/components/ExperiencesListing/SearchBar";
import SortDropdown from "@/components/ExperiencesListing/SortDropdown";
import Pagination from "@/components/ExperiencesListing/Pagination";
import ExperienceMobileFilterDrawer from "@/components/ExperiencesListing/ExperienceMobileFilterDrawer";
import ListingSkeleton from "@/components/ExperiencesListing/ListingSkeleton";
import Footer from "@/components/Home/Footer";

import api from "@/lib/api";

const ITEMS_PER_PAGE = 9;
const SEARCH_DEBOUNCE_MS = 300;

const ExperienceListing = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  // `search` is what the input shows; `debouncedSearch` is what filtering
  // actually uses — so fast typing doesn't re-filter the whole list on
  // every keystroke.
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedBestTime, setSelectedBestTime] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [priceRangeFilter, setPriceRangeFilter] = useState("all");
  const [freeOnly, setFreeOnly] = useState(false);

  const [sortBy, setSortBy] = useState("newest");
  // "Newly added" toggle and the sort dropdown both just set sortBy,
  // so they can never disagree with each other.
  const sortByNewest = sortBy === "newest";
  const setSortByNewest = useCallback(
    (val) => setSortBy(val ? "newest" : "az"),
    []
  );

  const [currentPage, setCurrentPage] = useState(1);

  const { destinationId } = useParams();
  

  const [searchParams] = useSearchParams();

  const navbarSearch = searchParams.get("search") || "";

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
  if (navbarSearch) {
    setSearch(navbarSearch);
    setDebouncedSearch(navbarSearch);
  }
}, [navbarSearch]);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const endpoint = destinationId
        ? `/experiences/destination/${destinationId}`
        : "/experiences";
      const res = await api.get(endpoint);
      setExperiences(res.data.experiences || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [destinationId]);

  const destinations = useMemo(
    () =>
      [...new Set(experiences.map((e) => e.destination?.name).filter(Boolean))].sort(),
    [experiences]
  );

  // Locations narrow to the selected destination (if any) so the list
  // stays short and relevant instead of dumping every location up front.
  const locations = useMemo(() => {
    const pool = selectedDestination
      ? experiences.filter((e) => e.destination?.name === selectedDestination)
      : experiences;
    return [...new Set(pool.map((e) => e.location).filter(Boolean))].sort();
  }, [experiences, selectedDestination]);

  const durations = useMemo(
    () => [...new Set(experiences.map((e) => e.duration).filter(Boolean))].sort(),
    [experiences]
  );

  const bestTimes = useMemo(
    () => [...new Set(experiences.map((e) => e.bestTime).filter(Boolean))].sort(),
    [experiences]
  );

  // If the parent filter changes and the child selection no longer
  // exists in that scope, clear it — prevents a "stuck" filter that
  // silently returns zero results.
  useEffect(() => {
    if (selectedLocation && !locations.includes(selectedLocation)) setSelectedLocation("");
  }, [locations, selectedLocation]);

  const filteredExperiences = useMemo(() => {
    let filtered = experiences;

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      filtered = filtered.filter((item) =>
        [
          item.title,
          item.location,
          item.category,
          item.destination?.name,
          item.destination?.city,
          item.destination?.state,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    if (selectedDestination) {
      filtered = filtered.filter((item) => item.destination?.name === selectedDestination);
    }

    if (selectedLocation) {
      filtered = filtered.filter((item) => item.location === selectedLocation);
    }

    if (selectedDuration) {
      filtered = filtered.filter((item) => item.duration === selectedDuration);
    }

    if (selectedBestTime) {
      filtered = filtered.filter((item) => item.bestTime === selectedBestTime);
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (item) => normalizeCategory(item.category) === selectedCategory
      );
    }

    if (selectedDifficulty) {
      filtered = filtered.filter((item) => item.difficultyLevel === selectedDifficulty);
    }

    if (priceRangeFilter !== "all") {
      filtered = filtered.filter((item) => matchesPriceRange(item.priceRange, priceRangeFilter));
    }

    if (freeOnly) {
      filtered = filtered.filter((item) => matchesPriceRange(item.priceRange, "free"));
    }

    const sorted = [...filtered];
    switch (sortBy) {
      case "price-low":
        sorted.sort(
          (a, b) =>
            (matchesPriceRange(a.priceRange, "free") ? 0 : parseInt(a.priceRange) || 0) -
            (matchesPriceRange(b.priceRange, "free") ? 0 : parseInt(b.priceRange) || 0)
        );
        break;
      case "price-high":
        sorted.sort(
          (a, b) =>
            (matchesPriceRange(b.priceRange, "free") ? 0 : parseInt(b.priceRange) || 0) -
            (matchesPriceRange(a.priceRange, "free") ? 0 : parseInt(a.priceRange) || 0)
        );
        break;
      case "az":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return sorted;
  }, [
    experiences,
    debouncedSearch,
    selectedDestination,
    selectedLocation,
    selectedDuration,
    selectedBestTime,
    selectedCategory,
    selectedDifficulty,
    priceRangeFilter,
    freeOnly,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredExperiences.length / ITEMS_PER_PAGE) || 1;

  const paginatedExperiences = useMemo(
    () =>
      filteredExperiences.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ),
    [filteredExperiences, currentPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearch,
    selectedCategory,
    selectedDestination,
    selectedLocation,
    selectedDuration,
    selectedBestTime,
    selectedDifficulty,
    priceRangeFilter,
    freeOnly,
    sortBy,
  ]);

  const activeFilterCount =
    [
      selectedDestination,
      selectedLocation,
      selectedDuration,
      selectedBestTime,
      selectedCategory,
      selectedDifficulty,
    ].filter(Boolean).length +
    (priceRangeFilter !== "all" ? 1 : 0) +
    (freeOnly ? 1 : 0);

  return (
    <div className="min-h-screen bg-orange-50/30 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile filter button */}
        <div className="lg:hidden mb-4">
          <ExperienceMobileFilterDrawer
            destinations={destinations}
            locations={locations}
            durations={durations}
            bestTimes={bestTimes}
            selectedDestination={selectedDestination}
            setSelectedDestination={setSelectedDestination}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedDuration={selectedDuration}
            setSelectedDuration={setSelectedDuration}
            selectedBestTime={selectedBestTime}
            setSelectedBestTime={setSelectedBestTime}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            priceRangeFilter={priceRangeFilter}
            setPriceRangeFilter={setPriceRangeFilter}
            freeOnly={freeOnly}
            setFreeOnly={setFreeOnly}
            sortByNewest={sortByNewest}
            setSortByNewest={setSortByNewest}
          />
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <ExperienceFilters
              destinations={destinations}
              locations={locations}
              durations={durations}
              bestTimes={bestTimes}
              selectedDestination={selectedDestination}
              setSelectedDestination={setSelectedDestination}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedDuration={selectedDuration}
              setSelectedDuration={setSelectedDuration}
              selectedBestTime={selectedBestTime}
              setSelectedBestTime={setSelectedBestTime}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              priceRangeFilter={priceRangeFilter}
              setPriceRangeFilter={setPriceRangeFilter}
              freeOnly={freeOnly}
              setFreeOnly={setFreeOnly}
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
                {selectedDestination && (
                  <FilterChip label={selectedDestination} onClear={() => setSelectedDestination("")} />
                )}
                {selectedLocation && (
                  <FilterChip label={selectedLocation} onClear={() => setSelectedLocation("")} />
                )}
                {selectedDuration && (
                  <FilterChip label={selectedDuration} onClear={() => setSelectedDuration("")} />
                )}
                {selectedBestTime && (
                  <FilterChip label={selectedBestTime} onClear={() => setSelectedBestTime("")} />
                )}
                {selectedCategory && (
                  <FilterChip label={selectedCategory} onClear={() => setSelectedCategory("")} />
                )}
                {selectedDifficulty && (
                  <FilterChip label={selectedDifficulty} onClear={() => setSelectedDifficulty("")} />
                )}
                {priceRangeFilter !== "all" && (
                  <FilterChip
                    label={PRICE_RANGE_OPTIONS.find((o) => o.value === priceRangeFilter)?.label}
                    onClear={() => setPriceRangeFilter("all")}
                  />
                )}
                {freeOnly && <FilterChip label="Free only" onClear={() => setFreeOnly(false)} />}
              </div>
            )}

            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
              <span className="font-semibold text-gray-900 dark:text-slate-100">{filteredExperiences.length}</span>{" "}
              experiences found
            </p>

            {loading ? (
              <ListingSkeleton />
            ) : (
              <>
                <ExperienceGrid experiences={paginatedExperiences} />
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
  <span className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-700 dark:text-orange-400 text-xs px-3 py-1 rounded-full">
    {label}
    <button type="button" onClick={onClear} className="text-orange-400 hover:text-orange-600 dark:hover:text-orange-300">
      ×
    </button>
  </span>
);

export default ExperienceListing;