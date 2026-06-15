import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const DestinationFilters = ({
  states, categories,
  selectedState, setSelectedState,
  selectedCategory, setSelectedCategory,
  featuredOnly, setFeaturedOnly,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-orange-100 p-5 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-orange-500" />
          Filters
        </h2>
        <button
          onClick={() => {
            setSelectedState("");
            setSelectedCategory("");
            setFeaturedOnly(false);
          }}
          className="text-xs text-orange-500 hover:text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1 rounded-full font-medium transition"
        >
          Reset all
        </button>
      </div>

      {/* Featured toggle */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Special</p>
        <div className="flex items-center gap-3">
          <Switch
            id="featured"
            checked={featuredOnly}
            onCheckedChange={setFeaturedOnly}
            className="data-[state=checked]:bg-orange-500"
          />
          <label htmlFor="featured" className="text-sm text-gray-600 cursor-pointer">
            Featured only
          </label>
        </div>
      </div>

      {/* States */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">State</p>
        <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
          {states.map((state) => (
            <button
              key={state}
              onClick={() => setSelectedState(selectedState === state ? "" : state)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                selectedState === state
                  ? "bg-orange-500 text-white font-medium"
                  : "text-gray-600 hover:bg-orange-50 hover:text-orange-700"
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Category</p>
        <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? "" : category)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                selectedCategory === category
                  ? "bg-orange-500 text-white font-medium"
                  : "text-gray-600 hover:bg-orange-50 hover:text-orange-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationFilters;