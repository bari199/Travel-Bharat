import React, { useMemo, useState, useEffect, useRef } from "react";
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

import { states } from "../../data/states";

import SearchBoxSkeleton from "../Skeletons/SearchBoxSkeleton";

const SearchBox = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [searchData, setSearchData] = useState({
    state: "",
    city: "",
    category: "",
    search: "",
  });

  const [destinations, setDestinations] = useState([]);

  const [activeDropdown, setActiveDropdown] = useState("");

  const wrapperRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  /* ---------------- CLOSE DROPDOWN ON OUTSIDE CLICK ---------------- */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setActiveDropdown("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- STATES ---------------- */

  const stateNames = states.map((item) => item.name);

  /* ---------------- CITIES ---------------- */

  const cityNames = useMemo(() => {
  if (!searchData.state) {
    return states.flatMap((state) =>
      state.cities.map((city) => city.name)
    );
  }

  const selectedState = states.find(
    (state) => state.name === searchData.state
  );

  return selectedState
    ? selectedState.cities.map(
        (city) => city.name
      )
    : [];
}, [searchData.state]);

  /* ---------------- CATEGORY ---------------- */

  const categoryNames = useMemo(() => {
    const allCategories = states.flatMap(
      (item) => item.category
    );

    return [...new Set(allCategories)];
  }, []);

  /* ---------------- DESTINATIONS ---------------- */

  const destinationNames = useMemo(() => {

  // State + City Selected
  if (
    searchData.state &&
    searchData.city
  ) {
    const selectedState = states.find(
      (state) =>
        state.name === searchData.state
    );

    const selectedCity =
      selectedState?.cities.find(
        (city) =>
          city.name === searchData.city
      );

    return selectedCity
      ? selectedCity.destinations
      : [];
  }

  // Only State Selected
  if (searchData.state) {
    const selectedState = states.find(
      (state) =>
        state.name === searchData.state
    );

    return selectedState
      ? selectedState.cities.flatMap(
          (city) => city.destinations
        )
      : [];
  }

  // All Destinations
  return states.flatMap((state) =>
    state.cities.flatMap(
      (city) => city.destinations
    )
  );

}, [
  searchData.state,
  searchData.city,
]);
  /* ---------------- HANDLE CHANGE ---------------- */

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- SELECT OPTION ---------------- */

  const handleSelect = (
  field,
  value
) => {

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

  if (field === "city") {
    setSearchData((prev) => ({
      ...prev,
      city: value,
      search: "",
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

  /* ---------------- CLEAR ALL ---------------- */

  const handleClearAll = () => {
    setSearchData({
      state: "",
      city: "",
      category: "",
      search: "",
    });
    setActiveDropdown("");
  };

  const hasActiveFilters =
    searchData.state ||
    searchData.city ||
    searchData.category ||
    searchData.search;

  /* ---------------- SEARCH API ---------------- */

  const handleSearch = async () => {
  try {
    const response = await api.post(
      "/search",
      searchData
    );

    console.log(response.data);

    setDestinations(response.data.destinations);

    if (
      response.data.destinations &&
      response.data.destinations.length > 0
    ) {
      navigate(
        `/destination/${response.data.destinations[0]._id}`
      );
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};


  if (loading) {
    return <SearchBoxSkeleton />;
  }

  /* ---------------- REUSABLE FIELD ---------------- */

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
      <div className="bg-orange-50 dark:bg-slate-800 p-2 rounded-full shrink-0 transition-colors group-focus-within:bg-orange-100 dark:group-focus-within:bg-slate-700">
        {icon}
      </div>

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
          onFocus={() => setActiveDropdown(fieldKey)}
          autoComplete="off"
          className="h-5 text-xs sm:text-sm border-0 shadow-none px-0 focus-visible:ring-0 truncate dark:text-slate-100 dark:placeholder:text-slate-500"
        />

        {activeDropdown === fieldKey && options.length > 0 && (
          <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] sm:top-16 z-50 w-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-xl shadow-xl max-h-56 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
            {options.map((item, index) => (
              <div
                key={index}
                onClick={() => onSelectField(item)}
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

  return (
    <div className="w-full flex flex-col items-center px-3 sm:px-4 relative">

      <div
        ref={wrapperRef}
        className="w-full max-w-5xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-lg shadow-orange-900/5 px-4 py-4 lg:px-5 lg:py-3 flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 transition-shadow hover:shadow-xl"
      >

        {/* STATE */}
        <div className="group">
          {renderField({
            fieldKey: "state",
            icon: <MapPin className="h-4 w-4 text-orange-500" />,
            label: "State",
            name: "state",
            placeholder: "Search state",
            value: searchData.state,
            options: stateNames,
            onSelectField: (item) => handleSelect("state", item),
          })}
        </div>

        {/* CITY */}
        <div className="group">
          {renderField({
            fieldKey: "city",
            icon: <Flag className="h-4 w-4 text-orange-500" />,
            label: "City",
            name: "city",
            placeholder: "Search city",
            value: searchData.city,
            options: cityNames,
            onSelectField: (item) => handleSelect("city", item),
          })}
        </div>

        {/* CATEGORY */}
        <div className="group">
          {renderField({
            fieldKey: "category",
            icon: <LayoutGrid className="h-4 w-4 text-orange-500" />,
            label: "Category",
            name: "category",
            placeholder: "Category",
            value: searchData.category,
            options: categoryNames,
            onSelectField: (item) => handleSelect("category", item),
          })}
        </div>

        {/* DESTINATION */}
        <div className="group">
          {renderField({
            fieldKey: "destination",
            icon: <Search className="h-4 w-4 text-orange-500" />,
            label: "Destination",
            name: "search",
            placeholder: "Search destination",
            value: searchData.search,
            options: destinationNames,
            onSelectField: (item) => handleSelect("search", item),
            showBorder: false,
          })}
        </div>

        {/* ACTIONS */}
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

      {/* RESULTS */}

      <div className="mt-8 sm:mt-10 w-full max-w-5xl">
        {destinations.length > 0 && (
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
            {destinations.length} destination
            {destinations.length > 1 ? "s" : ""} found
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((item) => (
            <div
              key={item._id}
              onClick={() =>
                navigate(`/destination/${item._id}`)
              }
              className="border border-gray-100 dark:border-slate-700 rounded-xl p-4 cursor-pointer bg-white dark:bg-slate-900 hover:shadow-lg hover:-translate-y-0.5 hover:border-orange-200 dark:hover:border-orange-500/40 transition-all duration-200"
            >
              <h1 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white truncate">
                {item.name}
              </h1>

              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{item.city}</span>
              </p>

              <p className="text-sm text-gray-400 dark:text-slate-500 truncate">
                {item.state}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;