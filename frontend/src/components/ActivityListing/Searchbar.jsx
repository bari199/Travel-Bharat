import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ search, setSearch }) => (
  <div className="relative">
    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search activities, cities, states…"
      className="w-full h-11 rounded-xl border border-orange-200 bg-white pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition placeholder:text-gray-400"
    />
  </div>
);

export default SearchBar;