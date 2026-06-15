import React from "react";

const SortDropdown = ({ sortBy, setSortBy }) => (
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="h-11 px-4 pr-9 rounded-xl border border-orange-200 bg-white text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition appearance-none cursor-pointer bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%239ca3af%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-no-repeat bg-[right_12px_center]"
  >
    <option value="featured">Featured first</option>
    <option value="rating">Highest rated</option>
    <option value="newest">Newest</option>
    <option value="az">A → Z</option>
    <option value="za">Z → A</option>
  </select>
);

export default SortDropdown;