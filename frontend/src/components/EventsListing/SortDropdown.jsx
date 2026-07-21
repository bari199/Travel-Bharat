import React from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";

const sortOptions = [
  {
    value: "newest",
    label: "Newest First",
  },
  {
    value: "oldest",
    label: "Oldest First",
  },
  {
    value: "date-asc",
    label: "Event Date (Earliest)",
  },
  {
    value: "date-desc",
    label: "Event Date (Latest)",
  },
  {
    value: "price-low",
    label: "Ticket Price (Low to High)",
  },
  {
    value: "price-high",
    label: "Ticket Price (High to Low)",
  },
  {
    value: "title-asc",
    label: "Title (A - Z)",
  },
  {
    value: "title-desc",
    label: "Title (Z - A)",
  },
];

const SortDropdown = ({ value, onChange }) => {
  return (
    <div className="relative min-w-[220px]">
      <ArrowUpDown
        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-400 pointer-events-none"
      />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          h-11
          appearance-none
          rounded-xl
          border
          border-orange-200
          dark:border-slate-700
          bg-white
          dark:bg-slate-900
          dark:text-slate-100
          pl-10
          pr-9
          text-sm
          font-medium
          text-gray-700
          outline-none
          transition
          cursor-pointer
          focus:border-orange-400
          focus:ring-2
          focus:ring-orange-200
        "
      >
        {sortOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-slate-400 pointer-events-none" />
    </div>
  );
};

export default SortDropdown;