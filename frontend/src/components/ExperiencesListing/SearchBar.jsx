import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ search, setSearch }) => (
  <div className="relative">
    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search experiences, locations, categories…"
      className="w-full h-11 rounded-xl border border-orange-200 dark:border-orange-500/20 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition placeholder:text-gray-400 dark:placeholder:text-slate-500"
    />
  </div>
);

export default SearchBar;