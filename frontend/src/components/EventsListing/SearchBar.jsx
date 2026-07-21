import React from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ value, onChange, onClear }) => {
  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <Search
        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-400"
      />

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search events by title, organizer, category or location…"
        className="w-full h-11 rounded-xl border border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 pl-10 pr-10 text-sm outline-none transition focus:ring-2 focus:ring-orange-200 focus:border-orange-400 placeholder:text-gray-400 dark:placeholder:text-slate-500"
      />

      {/* Clear Button */}
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-500 dark:text-slate-400 transition hover:bg-orange-100 dark:hover:bg-slate-800 hover:text-orange-600 dark:hover:text-orange-400"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;