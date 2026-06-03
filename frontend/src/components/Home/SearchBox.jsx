import React, { useMemo, useState, useEffect } from "react";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";

import {
  MapPin,
  Flag,
  LayoutGrid,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { states } from "../../data/data";

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  /* ---------------- STATES ---------------- */

  const stateNames = states.map((item) => item.name);

  /* ---------------- CITIES ---------------- */

  const cityNames = useMemo(() => {
    if (!searchData.state) {
      return states.flatMap((item) => item.cities);
    }

    const selectedState = states.find(
      (item) => item.name === searchData.state
    );

    return selectedState ? selectedState.cities : [];
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
    if (!searchData.state) {
      return states.flatMap(
        (item) => item.destinations
      );
    }

    const selectedState = states.find(
      (item) => item.name === searchData.state
    );

    return selectedState
      ? selectedState.destinations
      : [];
  }, [searchData.state]);

  /* ---------------- HANDLE CHANGE ---------------- */

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- SELECT OPTION ---------------- */

  const handleSelect = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setActiveDropdown("");
  };

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

  return (
    <div className="w-full flex flex-col items-center px-4 relative">

      <div className="w-full max-w-5xl bg-white border rounded-2xl shadow-sm px-3 py-2 flex flex-col lg:flex-row items-center gap-2">

        {/* STATE */}

        <div className="relative flex items-center gap-2 w-full lg:border-r lg:pr-4">
          <div className="bg-gray-100 p-2 rounded-full shrink-0">
            <MapPin className="h-4 w-4 text-gray-500" />
          </div>

          <div className="w-full">
            <p className="text-xs font-semibold text-gray-700">
              State
            </p>

            <Input
              type="text"
              name="state"
              placeholder="Search state"
              value={searchData.state}
              onChange={handleChange}
              onFocus={() => setActiveDropdown("state")}
              className="h-5 text-xs border-0 shadow-none px-0 focus-visible:ring-0"
            />

            {activeDropdown === "state" && (
              <div className="absolute left-0 top-16 z-50 w-full bg-white border rounded-xl shadow-lg max-h-52 overflow-y-auto">
                {stateNames.map((item, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      handleSelect("state", item)
                    }
                    className="px-4 py-2 text-sm hover:bg-orange-100 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CITY */}

        <div className="relative flex items-center gap-2 w-full lg:border-r lg:pr-4">
          <div className="bg-gray-100 p-2 rounded-full shrink-0">
            <Flag className="h-4 w-4 text-gray-500" />
          </div>

          <div className="w-full">
            <p className="text-xs font-semibold text-gray-700">
              City
            </p>

            <Input
              type="text"
              name="city"
              placeholder="Search city"
              value={searchData.city}
              onChange={handleChange}
              onFocus={() => setActiveDropdown("city")}
              className="h-5 text-xs border-0 shadow-none px-0 focus-visible:ring-0"
            />

            {activeDropdown === "city" && (
              <div className="absolute left-0 top-16 z-50 w-full bg-white border rounded-xl shadow-lg max-h-52 overflow-y-auto">
                {cityNames.map((item, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      handleSelect("city", item)
                    }
                    className="px-4 py-2 text-sm hover:bg-orange-100 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CATEGORY */}

        <div className="relative flex items-center gap-2 w-full lg:border-r lg:pr-4">
          <div className="bg-gray-100 p-2 rounded-full shrink-0">
            <LayoutGrid className="h-4 w-4 text-gray-500" />
          </div>

          <div className="w-full">
            <p className="text-xs font-semibold text-gray-700">
              Category
            </p>

            <Input
              type="text"
              name="category"
              placeholder="Category"
              value={searchData.category}
              onChange={handleChange}
              onFocus={() =>
                setActiveDropdown("category")
              }
              className="h-5 text-xs border-0 shadow-none px-0 focus-visible:ring-0"
            />

            {activeDropdown === "category" && (
              <div className="absolute left-0 top-16 z-50 w-full bg-white border rounded-xl shadow-lg max-h-52 overflow-y-auto">
                {categoryNames.map((item, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      handleSelect("category", item)
                    }
                    className="px-4 py-2 text-sm hover:bg-orange-100 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* DESTINATION */}

        <div className="relative flex items-center gap-2 w-full">
          <div className="bg-gray-100 p-2 rounded-full shrink-0">
            <Search className="h-4 w-4 text-gray-500" />
          </div>

          <div className="w-full">
            <p className="text-xs font-semibold text-gray-700">
              Destination
            </p>

            <Input
              type="text"
              name="search"
              placeholder="Search destination"
              value={searchData.search}
              onChange={handleChange}
              onFocus={() =>
                setActiveDropdown("destination")
              }
              className="h-5 text-xs border-0 shadow-none px-0 focus-visible:ring-0"
            />

            {activeDropdown === "destination" && (
              <div className="absolute left-0 top-16 z-50 w-full bg-white border rounded-xl shadow-lg max-h-52 overflow-y-auto">
                {destinationNames.map((item, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      handleSelect("search", item)
                    }
                    className="px-4 py-2 text-sm hover:bg-orange-100 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BUTTON */}

        <Button
          onClick={handleSearch}
          className="h-10 px-5 rounded-xl bg-orange-500 hover:bg-orange-600 text-sm font-medium w-full lg:w-auto"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {/* RESULTS */}

      <div className="mt-10 w-full max-w-5xl">
        {destinations.map((item) => (
          <div
            key={item._id}
            onClick={() =>
              navigate(`/destination/${item._id}`)
            }
            className="border rounded-xl p-4 mb-4 cursor-pointer hover:shadow-md transition"
          >
            <h1 className="font-semibold text-lg">
              {item.name}
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              {item.city}
            </p>

            <p className="text-sm text-gray-500">
              {item.state}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBox;