import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import DestinationFilters from "@/components/DestinationListing/DestinationFilters";
import DestinationGrid from "@/components/DestinationListing/DestinationGrid";
import SearchBar from "@/components/DestinationListing/SearchBar";
import SortDropdown from "@/components/DestinationListing/SortDropdown";
import Pagination from "@/components/DestinationListing/Pagination";
import MobileFilterDrawer from "@/components/DestinationListing/MobileFilterDrawer";
import ListingSkeleton from "@/components/DestinationListing/ListingSkeleton";
import Footer from "@/components/Home/Footer";

import api from "@/lib/api";

const ITEMS_PER_PAGE = 9;

const DestinationListing = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const [sortBy, setSortBy] = useState("featured");

  const [currentPage, setCurrentPage] = useState(1);

  const { stateSlug } = useParams();

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

  const states = useMemo(() => {
    return [...new Set(destinations.map((d) => d.state))];
  }, [destinations]);

  const categories = useMemo(() => {
    return [...new Set(destinations.map((d) => d.category))];
  }, [destinations]);

  const filteredDestinations = useMemo(() => {
    let filtered = [...destinations];

    if (search.trim()) {
      filtered = filtered.filter((item) =>
        [item.name, item.state, item.city, item.category]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
    }

    if (selectedState) {
      filtered = filtered.filter((item) => item.state === selectedState);
    }

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (featuredOnly) {
      filtered = filtered.filter((item) => item.featured);
    }

    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;

      case "az":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "za":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;

      default:
        filtered.sort((a, b) => b.featured - a.featured);
    }

    return filtered;
  }, [
    destinations,
    search,
    selectedCategory,
    selectedState,
    featuredOnly,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);

  const paginatedDestinations = filteredDestinations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedState, featuredOnly, sortBy]);

  return (
    <div className="min-h-screen bg-orange-50/30">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile filter button */}
        <div className="lg:hidden mb-4">
          <MobileFilterDrawer
            states={states}
            categories={categories}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            featuredOnly={featuredOnly}
            setFeaturedOnly={setFeaturedOnly}
          />
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <DestinationFilters
              states={states}
              categories={categories}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              featuredOnly={featuredOnly}
              setFeaturedOnly={setFeaturedOnly}
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

            {/* Active filter chips */}
            {(selectedState || selectedCategory || featuredOnly) && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedState && (
                  <span className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-700 text-xs px-3 py-1 rounded-full">
                    {selectedState}
                    <button
                      onClick={() => setSelectedState("")}
                      className="text-orange-400 hover:text-orange-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-700 text-xs px-3 py-1 rounded-full">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("")}
                      className="text-orange-400 hover:text-orange-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {featuredOnly && (
                  <span className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-700 text-xs px-3 py-1 rounded-full">
                    Featured only
                    <button
                      onClick={() => setFeaturedOnly(false)}
                      className="text-orange-400 hover:text-orange-600"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}

            <p className="text-sm text-gray-500 mb-4">
              <span className="font-semibold text-gray-900">
                {filteredDestinations.length}
              </span>{" "}
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

export default DestinationListing;
