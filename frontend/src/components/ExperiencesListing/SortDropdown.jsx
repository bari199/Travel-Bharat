import React from "react";

const SortDropdown = ({ sortBy, setSortBy }) => (
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="
      h-11 px-4 pr-9 rounded-xl
      border border-orange-200 dark:border-orange-500/20
      bg-white dark:bg-slate-900
      text-sm text-gray-700 dark:text-slate-300
      outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400
      transition appearance-none cursor-pointer
      bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%239ca3af%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')]
      dark:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2394a3b8%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')]
      bg-no-repeat bg-[right_12px_center]
    "
  >
    <option value="newest" className="bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300">
      Newest first
    </option>
    <option value="price-low" className="bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300">
      Price: Low to high
    </option>
    <option value="price-high" className="bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300">
      Price: High to low
    </option>
    <option value="az" className="bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300">
      A → Z
    </option>
    <option value="za" className="bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300">
      Z → A
    </option>
  </select>
);

export default SortDropdown;