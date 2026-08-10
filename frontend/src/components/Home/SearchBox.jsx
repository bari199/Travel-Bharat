import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";

import api from "@/lib/api";
import { useNavigate } from "react-router-dom";

import {
  MapPin,
  Flag,
  LayoutGrid,
  Search,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import SearchBoxSkeleton from "../Skeletons/SearchBoxSkeleton";

const SearchBox = () => {
  const navigate = useNavigate();

  /* =========================================================
     LOADING
  ========================================================= */

  const [loading, setLoading] = useState(true);

  /* =========================================================
     SEARCH DATA
  ========================================================= */

  const [searchData, setSearchData] = useState({
    state: "",
    city: "",
    category: "",
    search: "",
  });

  /* =========================================================
     MONGODB SEARCH OPTIONS
  ========================================================= */

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);

  /* =========================================================
     SEARCH RESULTS
  ========================================================= */

  const [destinations, setDestinations] = useState([]);

  /* =========================================================
     DESTINATION DROPDOWN
  ========================================================= */

  const [destinationNames, setDestinationNames] = useState([]);

  /* =========================================================
     DROPDOWN
  ========================================================= */

  const [activeDropdown, setActiveDropdown] = useState("");

  const wrapperRef = useRef(null);

  /* =========================================================
     LOAD SEARCH OPTIONS FROM MONGODB
  ========================================================= */

  useEffect(() => {
    const loadSearchOptions = async () => {
      try {
        const response = await api.get("/search/options");

        if (response.data?.success) {
          setStates(response.data.states || []);
          setCities(response.data.cities || []);
          setCategories(response.data.categories || []);
        }
      } catch (error) {
        console.error(
          "Failed to load search options:",
          error.response?.data || error.message
        );
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1200);
      }
    };

    loadSearchOptions();
  }, []);

  /* =========================================================
     CLOSE DROPDOWN ON OUTSIDE CLICK
  ========================================================= */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setActiveDropdown("");
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =========================================================
     CITY OPTIONS
     ---------------------------------------------------------
     If no state:
       Show all cities from MongoDB.

     If state selected:
       Fetch cities belonging to that state
       from MongoDB.
  ========================================================= */

  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    const loadCities = async () => {
      try {
        /* No state selected */

        if (!searchData.state) {
          setFilteredCities(cities);
          return;
        }

        /* State selected */

        const response = await api.post("/search", {
          state: searchData.state,
        });

        const results =
          response.data?.destinations || [];

        const uniqueCities = [
          ...new Set(
            results
              .map((item) => item.city?.trim())
              .filter(Boolean)
          ),
        ].sort((a, b) =>
          a.localeCompare(b)
        );

        setFilteredCities(uniqueCities);
      } catch (error) {
        console.error(
          "Failed to load cities:",
          error.response?.data || error.message
        );

        setFilteredCities([]);
      }
    };

    loadCities();
  }, [searchData.state, cities]);

  /* =========================================================
     STATE OPTIONS
  ========================================================= */

  const stateNames = useMemo(() => {
    return states;
  }, [states]);

  /* =========================================================
     CITY OPTIONS
  ========================================================= */

  const cityNames = useMemo(() => {
    return filteredCities;
  }, [filteredCities]);

  /* =========================================================
     CATEGORY OPTIONS
  ========================================================= */

  const categoryNames = useMemo(() => {
    return categories;
  }, [categories]);

  /* =========================================================
     DESTINATION OPTIONS
     ---------------------------------------------------------
     Always comes from MongoDB.
  ========================================================= */

  useEffect(() => {
    const loadDestinationNames = async () => {
      try {
        const response = await api.post("/search", {
          state: searchData.state,
          city: searchData.city,
          category: searchData.category,
        });

        const results =
          response.data?.destinations || [];

        const names = [
          ...new Set(
            results
              .map((item) => item.name?.trim())
              .filter(Boolean)
          ),
        ].sort((a, b) =>
          a.localeCompare(b)
        );

        setDestinationNames(names);
      } catch (error) {
        console.error(
          "Failed to load destinations:",
          error.response?.data || error.message
        );

        setDestinationNames([]);
      }
    };

    loadDestinationNames();
  }, [
    searchData.state,
    searchData.city,
    searchData.category,
  ]);

  /* =========================================================
     HANDLE INPUT CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     SELECT OPTION
  ========================================================= */

  const handleSelect = (field, value) => {
    /* STATE */

    if (field === "state") {
      setSearchData((prev) => ({
        ...prev,
        state: value,
        city: "",
        search: "",
      }));

      setActiveDropdown("");
      return;
    }

    /* CITY */

    if (field === "city") {
      setSearchData((prev) => ({
        ...prev,
        city: value,
        search: "",
      }));

      setActiveDropdown("");
      return;
    }

    /* CATEGORY */

    if (field === "category") {
      setSearchData((prev) => ({
        ...prev,
        category: value,
        search: "",
      }));

      setActiveDropdown("");
      return;
    }

    /* DESTINATION */

    if (field === "search") {
      setSearchData((prev) => ({
        ...prev,
        search: value,
      }));

      setActiveDropdown("");
      return;
    }

    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setActiveDropdown("");
  };

  /* =========================================================
     CLEAR ALL
  ========================================================= */

  const handleClearAll = () => {
    setSearchData({
      state: "",
      city: "",
      category: "",
      search: "",
    });

    setDestinations([]);
    setDestinationNames([]);
    setActiveDropdown("");
  };

  /* =========================================================
     ACTIVE FILTER CHECK
  ========================================================= */

  const hasActiveFilters =
    searchData.state ||
    searchData.city ||
    searchData.category ||
    searchData.search;

  /* =========================================================
     SEARCH API
  ========================================================= */

  const handleSearch = async () => {
    try {
      const response = await api.post(
        "/search",
        searchData
      );

      console.log(
        "MongoDB Search Response:",
        response.data
      );

      const results =
        response.data?.destinations || [];

      setDestinations(results);

      /* =====================================================
         EXACTLY ONE RESULT
         -----------------------------------------------------
         Directly open destination details.
      ===================================================== */

      if (results.length === 1) {
        navigate(
          `/destination/${results[0]._id}`
        );
      }
    } catch (error) {
      console.error(
        "Search error:",
        error.response?.data || error.message
      );

      setDestinations([]);
    }
  };

  /* =========================================================
     SKELETON
  ========================================================= */

  if (loading) {
    return <SearchBoxSkeleton />;
  }

  /* =========================================================
     REUSABLE FIELD
  ========================================================= */

  const renderField = ({
    fieldKey,
    icon,
    label,
    name,
    placeholder,
    value,
    options,
    onSelectField,
    showBorder = true,
  }) => (
    <div
      className={`relative flex items-center gap-2 sm:gap-3 w-full py-2.5 sm:py-1 lg:py-0 ${
        showBorder
          ? "border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-slate-700 lg:pr-4"
          : ""
      }`}
    >
      {icon}

      <div className="w-full min-w-0">
        <p className="text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-slate-300">
          {label}
        </p>

        <Input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() =>
            setActiveDropdown(fieldKey)
          }
          autoComplete="off"
          className="h-5 text-xs sm:text-sm border-0 shadow-none px-0 focus-visible:ring-0 truncate dark:text-slate-100 dark:placeholder:text-slate-500"
        />

        {activeDropdown === fieldKey &&
          options.length > 0 && (
            <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] sm:top-16 z-50 w-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-xl shadow-xl max-h-56 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
              {options.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  onClick={() =>
                    onSelectField(item)
                  }
                  className="px-4 py-2.5 text-sm text-gray-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-orange-600 dark:hover:text-orange-400 cursor-pointer transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="w-full">
      {/* =====================================================
          SEARCH BOX
          -----------------------------------------------------
          mx-auto is important here.
          It keeps the search box horizontally centered.
      ===================================================== */}

      <div
        ref={wrapperRef}
        className="w-full max-w-5xl mx-auto bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-lg shadow-orange-900/5 px-4 py-4 lg:px-5 lg:py-3 flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 transition-shadow hover:shadow-xl"
      >
        {/* =================================================
            STATE
        ================================================= */}

        <div className="group w-full lg:flex-1">
          {renderField({
            fieldKey: "state",
            icon: (
              <MapPin className="h-4 w-4 text-orange-500 shrink-0" />
            ),
            label: "State",
            name: "state",
            placeholder: "Search state",
            value: searchData.state,
            options: stateNames,
            onSelectField: (item) =>
              handleSelect("state", item),
          })}
        </div>

        {/* =================================================
            CITY
        ================================================= */}

        <div className="group w-full lg:flex-1">
          {renderField({
            fieldKey: "city",
            icon: (
              <Flag className="h-4 w-4 text-orange-500 shrink-0" />
            ),
            label: "City",
            name: "city",
            placeholder: "Search city",
            value: searchData.city,
            options: cityNames,
            onSelectField: (item) =>
              handleSelect("city", item),
          })}
        </div>

        {/* =================================================
            CATEGORY
        ================================================= */}

        <div className="group w-full lg:flex-1">
          {renderField({
            fieldKey: "category",
            icon: (
              <LayoutGrid className="h-4 w-4 text-orange-500 shrink-0" />
            ),
            label: "Category",
            name: "category",
            placeholder: "Category",
            value: searchData.category,
            options: categoryNames,
            onSelectField: (item) =>
              handleSelect(
                "category",
                item
              ),
          })}
        </div>

        {/* =================================================
            DESTINATION
        ================================================= */}

        <div className="group w-full lg:flex-1">
          {renderField({
            fieldKey: "destination",
            icon: (
              <Search className="h-4 w-4 text-orange-500 shrink-0" />
            ),
            label: "Destination",
            name: "search",
            placeholder: "Search destination",
            value: searchData.search,
            options: destinationNames,
            onSelectField: (item) =>
              handleSelect(
                "search",
                item
              ),
            showBorder: false,
          })}
        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="flex items-center gap-2 w-full lg:w-auto pt-1 lg:pt-0 lg:pl-2">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearAll}
              className="hidden sm:flex items-center justify-center h-10 w-10 rounded-xl text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Clear all filters"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <Button
            onClick={handleSearch}
            className="h-11 lg:h-10 px-5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-sm font-medium w-full lg:w-auto transition-all duration-200 shadow-md shadow-orange-500/20"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* =====================================================
          RESULTS
          -----------------------------------------------------
          Also centered using mx-auto.
      ===================================================== */}

      <div className="mt-8 sm:mt-10 w-full max-w-5xl mx-auto">
        {destinations.length > 0 && (
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
            {destinations.length} destination
            {destinations.length > 1
              ? "s"
              : ""}{" "}
            found
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((item) => (
            <div
              key={item._id}
              onClick={() =>
                navigate(
                  `/destination/${item._id}`
                )
              }
              className="border border-gray-100 dark:border-slate-700 rounded-xl p-4 cursor-pointer bg-white dark:bg-slate-900 hover:shadow-lg hover:-translate-y-0.5 hover:border-orange-200 dark:hover:border-orange-500/40 transition-all duration-200"
            >
              <h1 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white truncate">
                {item.name}
              </h1>

              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 shrink-0" />

                <span className="truncate">
                  {item.city}
                </span>
              </p>

              <p className="text-sm text-gray-400 dark:text-slate-500 truncate">
                {item.state}
              </p>

              {item.category && (
                <p className="text-xs text-orange-500 mt-2 truncate">
                  {item.category}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;