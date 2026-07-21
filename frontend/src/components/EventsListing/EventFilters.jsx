import React from "react";
import { Filter, RotateCcw } from "lucide-react";

const EventFilters = ({
  filters,
  setFilters,
  categories = [],
}) => {
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "all",
      price: "all",
      status: "all",
      featured: "all",
    });
  };

  return (
    <aside className="bg-white dark:bg-slate-900 rounded-2xl border border-orange-100 dark:border-slate-700 shadow-sm p-5 sticky top-24">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-orange-500" />

          <h2 className="text-base font-bold dark:text-white">
            Filters
          </h2>
        </div>

        <button
          onClick={clearFilters}
          className="flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear
        </button>
      </div>

      <div className="space-y-5">

        {/* Category */}

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-2">
            Category
          </label>

          <select
            value={filters.category}
            onChange={(e) =>
              updateFilter("category", e.target.value)
            }
            className="w-full h-11 rounded-xl border border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 px-3.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
          >
            <option value="all">All Categories</option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Ticket */}

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-2">
            Ticket Price
          </label>

          <select
            value={filters.price}
            onChange={(e) =>
              updateFilter("price", e.target.value)
            }
            className="w-full h-11 rounded-xl border border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 px-3.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
          >
            <option value="all">
              All Events
            </option>

            <option value="free">
              Free Events
            </option>

            <option value="paid">
              Paid Events
            </option>
          </select>
        </div>

        {/* Status */}

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-2">
            Event Status
          </label>

          <select
            value={filters.status}
            onChange={(e) =>
              updateFilter("status", e.target.value)
            }
            className="w-full h-11 rounded-xl border border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 px-3.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
          >
            <option value="all">
              All Events
            </option>

            <option value="upcoming">
              Upcoming
            </option>

            <option value="completed">
              Completed
            </option>
          </select>
        </div>

        {/* Featured */}

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-2">
            Featured
          </label>

          <select
            value={filters.featured}
            onChange={(e) =>
              updateFilter("featured", e.target.value)
            }
            className="w-full h-11 rounded-xl border border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 px-3.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
          >
            <option value="all">
              All Events
            </option>

            <option value="yes">
              Featured Only
            </option>

            <option value="no">
              Non Featured
            </option>
          </select>
        </div>

      </div>
    </aside>
  );
};

export default EventFilters;