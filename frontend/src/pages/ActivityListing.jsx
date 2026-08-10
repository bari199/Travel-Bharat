import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ActivityFilters, {
  normalizeCategory,
  matchesPrice,
  PRICE_RANGES,
} from "@/components/ActivityListing/ActivityFilters";
import ActivityGrid from "@/components/ActivityListing/ActivityGrid";
import SearchBar from "@/components/ActivityListing/Searchbar";
import SortDropdown from "@/components/ActivityListing/Sortdropdown";
import Pagination from "@/components/ActivityListing/Pagination";
import MobileFilterDrawer from "@/components/ActivityListing/Mobilefilterdrawer";
import ListingSkeleton from "@/components/ActivityListing/Listingskeleton";
import Footer from "@/components/Home/Footer";

import api from "@/lib/api";

const ITEMS_PER_PAGE = 9;
const SEARCH_DEBOUNCE_MS = 300;

const ActivityListing = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);


  
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedActivityType, setSelectedActivityType] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
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


  
  const { stateSlug, citySlug } = useParams();


  
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const seeded = searchParams.get("search");
    if (seeded) {
      setSearch(seeded);
      setDebouncedSearch(seeded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await api.get("/activities");
      setActivities(res.data.activities || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchActivities();
  }, []);


  
  const normalizeSlug = (str) => (str || "").toString().trim().toLowerCase();

  const locationScopedActivities = useMemo(() => {
    if (!stateSlug) return activities;
    return activities.filter((item) => {
      const stateMatch =
        normalizeSlug(item.destination?.state) === normalizeSlug(stateSlug);
      if (!stateMatch) return false;
      if (!citySlug) return true;
      return normalizeSlug(item.destination?.city) === normalizeSlug(citySlug);
    });
  }, [activities, stateSlug, citySlug]);


  
  const states = useMemo(
    () =>
      [...new Set(locationScopedActivities.map((a) => a.destination?.state).filter(Boolean))].sort(),
    [locationScopedActivities]
  );

  
  const cities = useMemo(() => {
    const pool = selectedState
      ? locationScopedActivities.filter((a) => a.destination?.state === selectedState)
      : locationScopedActivities;
    return [...new Set(pool.map((a) => a.destination?.city).filter(Boolean))].sort();
  }, [locationScopedActivities, selectedState]);


  
  useEffect(() => {
    if (selectedCity && !cities.includes(selectedCity)) setSelectedCity("");
  }, [cities, selectedCity]);

  const filteredActivities = useMemo(() => {
    let filtered = locationScopedActivities;

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      filtered = filtered.filter((item) =>
        [
          item.title,
          item.destination?.state,
          item.destination?.city,
          item.category,
          item.activityType,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    if (selectedState) {
      filtered = filtered.filter((item) => item.destination?.state === selectedState);
    }

    if (selectedCity) {
      filtered = filtered.filter((item) => item.destination?.city === selectedCity);
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (item) => normalizeCategory(item.category) === selectedCategory
      );
    }

    if (selectedActivityType) {
      filtered = filtered.filter((item) => item.activityType === selectedActivityType);
    }

    if (selectedDifficulty) {
      filtered = filtered.filter((item) => item.difficulty === selectedDifficulty);
    }

    if (selectedSeason) {
      filtered = filtered.filter((item) =>
        (item.bestTime || "").toLowerCase().includes(selectedSeason)
      );
    }

    if (priceFilter !== "all") {
      filtered = filtered.filter((item) => matchesPrice(item.price, priceFilter));
    }

    if (freeOnly) {
      filtered = filtered.filter((item) => matchesPrice(item.price, "free"));
    }

    const sorted = [...filtered];
    switch (sortBy) {
      case "price_low":
        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price_high":
        sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "az":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // "newest" — Activity has `timestamps: true`, so createdAt always exists
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return sorted;
  }, [
    locationScopedActivities,
    debouncedSearch,
    selectedState,
    selectedCity,
    selectedCategory,
    selectedActivityType,
    selectedDifficulty,
    selectedSeason,
    priceFilter,
    freeOnly,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE) || 1;

  const paginatedActivities = useMemo(
    () =>
      filteredActivities.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ),
    [filteredActivities, currentPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearch,
    selectedCategory,
    selectedActivityType,
    selectedDifficulty,
    selectedState,
    selectedCity,
    selectedSeason,
    priceFilter,
    freeOnly,
    sortBy,
  ]);

  const activeFilterCount =
    [selectedState, selectedCity, selectedCategory, selectedActivityType, selectedDifficulty, selectedSeason].filter(
      Boolean
    ).length +
    (priceFilter !== "all" ? 1 : 0) +
    (freeOnly ? 1 : 0);

  return (
    <div className="min-h-screen bg-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile filter button */}
        <div className="lg:hidden mb-4">
          <MobileFilterDrawer
            states={states}
            cities={cities}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedActivityType={selectedActivityType}
            setSelectedActivityType={setSelectedActivityType}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            selectedSeason={selectedSeason}
            setSelectedSeason={setSelectedSeason}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            freeOnly={freeOnly}
            setFreeOnly={setFreeOnly}
            sortByNewest={sortByNewest}
            setSortByNewest={setSortByNewest}
          />
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <ActivityFilters
              states={states}
              cities={cities}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedActivityType={selectedActivityType}
              setSelectedActivityType={setSelectedActivityType}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              selectedSeason={selectedSeason}
              setSelectedSeason={setSelectedSeason}
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
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
                {selectedState && <FilterChip label={selectedState} onClear={() => setSelectedState("")} />}
                {selectedCity && <FilterChip label={selectedCity} onClear={() => setSelectedCity("")} />}
                {selectedCategory && (
                  <FilterChip label={selectedCategory} onClear={() => setSelectedCategory("")} />
                )}
                {selectedActivityType && (
                  <FilterChip label={selectedActivityType} onClear={() => setSelectedActivityType("")} />
                )}
                {selectedDifficulty && (
                  <FilterChip label={selectedDifficulty} onClear={() => setSelectedDifficulty("")} />
                )}
                {selectedSeason && (
                  <FilterChip
                    label={selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1)}
                    onClear={() => setSelectedSeason("")}
                  />
                )}
                {priceFilter !== "all" && (
                  <FilterChip
                    label={PRICE_RANGES.find((o) => o.value === priceFilter)?.label}
                    onClear={() => setPriceFilter("all")}
                  />
                )}
                {freeOnly && (
                  <FilterChip label="Free only" onClear={() => setFreeOnly(false)} />
                )}
              </div>
            )}

            <p className="text-sm text-gray-500 mb-4">
              <span className="font-semibold text-gray-900">{filteredActivities.length}</span>{" "}
              activities found
            </p>

            {loading ? (
              <ListingSkeleton />
            ) : (
              <>
                <ActivityGrid activities={paginatedActivities} />
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

export default ActivityListing;