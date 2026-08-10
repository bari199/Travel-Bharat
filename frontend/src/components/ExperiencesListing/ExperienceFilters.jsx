import React, { useState, useMemo } from "react";
import {
  SlidersHorizontal,
  Search,
  Sparkles,
  IndianRupee,
  X,
  Waves,
  Landmark,
  Trees,
  Footprints,
  Camera,
  PawPrint,
  UtensilsCrossed,
  MapPin,
  Compass,
  Gauge,
  Clock,
  CalendarClock,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatePresence, motion } from "framer-motion";


export const CATEGORIES = [
  { value: "Adventure", label: "Adventure", icon: Compass },
  { value: "Trekking", label: "Trekking", icon: Footprints },
  { value: "Cultural", label: "Cultural", icon: Landmark },
  { value: "Nature", label: "Nature", icon: Trees },
  { value: "Wildlife", label: "Wildlife", icon: PawPrint },
  { value: "Water Sports", label: "Water Sports", icon: Waves },
  { value: "Food & Cuisine", label: "Food & Cuisine", icon: UtensilsCrossed },
  { value: "Spiritual", label: "Spiritual", icon: Sparkles },
  { value: "Photography", label: "Photography", icon: Camera },
  { value: "Other", label: "Other", icon: MapPin },
];

export const normalizeCategory = (raw) => {
  if (!raw) return "Other";
  const val = String(raw).trim().toLowerCase();
  const found = CATEGORIES.find((c) => c.value.toLowerCase() === val);
  return found ? found.value : "Other";
};

export const DIFFICULTY_LEVELS = ["Easy", "Moderate", "Challenging", "Difficult"];

export const normalizeDifficulty = (raw) => {
  if (!raw) return "";
  const val = String(raw).trim().toLowerCase();
  const found = DIFFICULTY_LEVELS.find((d) => d.toLowerCase() === val);
  return found || raw;
};

/* Turns a priceRange string ("Free", "₹500", "₹500 - ₹1500") into a
   plain number, using the lowest figure found — same approach as
   DestinationFilters' parseEntryFee. */
export const parsePriceRange = (priceStr) => {
  if (!priceStr) return 0;
  const str = String(priceStr).toLowerCase();
  if (str.includes("free")) return 0;
  const match = str.match(/[\d,]+/);
  if (!match) return 0;
  return parseInt(match[0].replace(/,/g, ""), 10) || 0;
};

export const PRICE_RANGE_OPTIONS = [
  { value: "all", label: "Any price" },
  { value: "free", label: "Free" },
  { value: "low", label: "₹1 – ₹500" },
  { value: "mid", label: "₹500 – ₹1,500" },
  { value: "high", label: "₹1,500+" },
];

export const matchesPriceRange = (priceStr, filterValue) => {
  if (!filterValue || filterValue === "all") return true;
  const amount = parsePriceRange(priceStr);
  if (filterValue === "free") return amount === 0;
  if (filterValue === "low") return amount > 0 && amount <= 500;
  if (filterValue === "mid") return amount > 500 && amount <= 1500;
  if (filterValue === "high") return amount > 1500;
  return true;
};

/* Reusable searchable pill list — used for Destination / Location /
   Duration / Best time */
const PillList = ({ items = [], selected, onSelect, search, setSearch, placeholder }) => (
  <div>
    {items.length > 6 && (
      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 text-gray-300 dark:text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="h-8 pl-8 text-xs rounded-lg border-gray-200 dark:border-slate-700 focus-visible:ring-orange-500 focus-visible:ring-offset-0"
        />
      </div>
    )}
    <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
      {items.length === 0 && (
        <p className="text-xs text-gray-300 dark:text-slate-600 px-3 py-2">No matches</p>
      )}
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(selected === item ? "" : item)}
          className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors duration-150 ${
            selected === item
              ? "bg-orange-500 text-white font-medium shadow-sm shadow-orange-200"
              : "text-gray-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-700"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
);


const FilterToggle = ({ id, label, icon: Icon, checked, onCheckedChange }) => (
  <div className="flex items-center justify-between">
    <label htmlFor={id} className="text-sm text-gray-600 dark:text-slate-300 cursor-pointer flex items-center gap-1.5">
      {Icon && <Icon className="w-3.5 h-3.5 text-orange-400" />}
      {label}
    </label>
    <Switch
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-slate-700 border border-transparent [&>span]:bg-white [&>span]:shadow-md"
    />
  </div>
);

const ExperienceFilters = ({
  destinations = [],
  locations = [],
  durations = [],
  bestTimes = [],

  selectedDestination,
  setSelectedDestination,
  selectedLocation,
  setSelectedLocation,
  selectedDuration,
  setSelectedDuration,
  selectedBestTime,
  setSelectedBestTime,

  selectedCategory,
  setSelectedCategory,

  selectedDifficulty,
  setSelectedDifficulty,

  priceRangeFilter,
  setPriceRangeFilter,
  freeOnly,
  setFreeOnly,

  sortByNewest,
  setSortByNewest,
}) => {
  const [destinationSearch, setDestinationSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [durationSearch, setDurationSearch] = useState("");
  const [bestTimeSearch, setBestTimeSearch] = useState("");

  const filteredDestinations = useMemo(
    () => destinations.filter((d) => d.toLowerCase().includes(destinationSearch.toLowerCase())),
    [destinations, destinationSearch]
  );
  const filteredLocations = useMemo(
    () => locations.filter((l) => l.toLowerCase().includes(locationSearch.toLowerCase())),
    [locations, locationSearch]
  );
  const filteredDurations = useMemo(
    () => durations.filter((d) => d.toLowerCase().includes(durationSearch.toLowerCase())),
    [durations, durationSearch]
  );
  const filteredBestTimes = useMemo(
    () => bestTimes.filter((b) => b.toLowerCase().includes(bestTimeSearch.toLowerCase())),
    [bestTimes, bestTimeSearch]
  );

  const activeChips = [
    selectedDestination && {
      key: "destination",
      label: selectedDestination,
      clear: () => setSelectedDestination(""),
    },
    selectedLocation && { key: "location", label: selectedLocation, clear: () => setSelectedLocation("") },
    selectedCategory && { key: "category", label: selectedCategory, clear: () => setSelectedCategory("") },
    selectedDifficulty && {
      key: "difficulty",
      label: selectedDifficulty,
      clear: () => setSelectedDifficulty(""),
    },
    selectedDuration && { key: "duration", label: selectedDuration, clear: () => setSelectedDuration("") },
    selectedBestTime && { key: "bestTime", label: selectedBestTime, clear: () => setSelectedBestTime("") },
    priceRangeFilter !== "all" && {
      key: "price",
      label: PRICE_RANGE_OPTIONS.find((o) => o.value === priceRangeFilter)?.label,
      clear: () => setPriceRangeFilter("all"),
    },
    freeOnly && { key: "free", label: "Free only", clear: () => setFreeOnly(false) },
    sortByNewest && { key: "newest", label: "Newest first", clear: () => setSortByNewest(false) },
  ].filter(Boolean);

  const resetAll = () => {
    setSelectedDestination("");
    setSelectedLocation("");
    setSelectedCategory("");
    setSelectedDifficulty("");
    setSelectedDuration("");
    setSelectedBestTime("");
    setPriceRangeFilter("all");
    setFreeOnly(false);
    setSortByNewest(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-orange-100 dark:border-orange-500/20 p-5 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-slate-100 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-orange-500" />
          Filters
          {activeChips.length > 0 && (
            <Badge className="bg-orange-500 hover:bg-orange-500 text-white text-[10px] h-5 px-1.5 rounded-full">
              {activeChips.length}
            </Badge>
          )}
        </h2>
        <button
          type="button"
          onClick={resetAll}
          className="text-xs text-orange-500 hover:text-orange-600 bg-orange-50 dark:bg-orange-500/10 hover:bg-orange-100 dark:hover:bg-orange-500/15 px-3 py-1 rounded-full font-medium transition-colors"
        >
          Reset all
        </button>
      </div>

      {/* Active filter chips */}
      <AnimatePresence>
        {activeChips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="flex flex-wrap gap-1.5 mb-4 overflow-hidden"
          >
            {activeChips.map((chip) => (
              <button
                type="button"
                key={chip.key}
                onClick={chip.clear}
                className="flex items-center gap-1 bg-orange-50 dark:bg-orange-500/10 text-orange-700 text-[11px] font-medium pl-2.5 pr-1.5 py-1 rounded-full hover:bg-orange-100 dark:hover:bg-orange-500/15 transition-colors"
              >
                {chip.label}
                <X className="w-3 h-3" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick toggles */}
      <div className="mb-5 pb-5 border-b border-gray-100 dark:border-slate-800 space-y-3">
        <p className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1">Special</p>
        <FilterToggle id="freeOnly" label="Free only" icon={IndianRupee} checked={freeOnly} onCheckedChange={setFreeOnly} />
        <FilterToggle id="newest" label="Newly added" icon={Sparkles} checked={sortByNewest} onCheckedChange={setSortByNewest} />
      </div>

      {/* Category — fixed icon grid */}
      <div className="mb-5 pb-5 border-b border-gray-100 dark:border-slate-800">
        <p className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3">Category</p>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map(({ value, label, icon: Icon }) => {
            const active = selectedCategory === value;
            return (
              <button
                type="button"
                key={value}
                onClick={() => setSelectedCategory(active ? "" : value)}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-medium transition-colors duration-150 ${
                  active
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                    : "bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-700"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? "text-white" : "text-orange-400"}`} />
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty level */}
      <div className="mb-5 pb-5 border-b border-gray-100 dark:border-slate-800">
        <p className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-orange-400" />
          Difficulty
        </p>
        <div className="flex flex-wrap gap-1.5">
          {DIFFICULTY_LEVELS.map((level) => (
            <button
              type="button"
              key={level}
              onClick={() => setSelectedDifficulty(selectedDifficulty === level ? "" : level)}
              className={`px-2.5 py-1.5 rounded-full text-[11px] font-medium transition-colors duration-150 ${
                selectedDifficulty === level
                  ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                  : "bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-700"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="mb-5 pb-5 border-b border-gray-100 dark:border-slate-800">
        <p className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <IndianRupee className="w-3.5 h-3.5 text-orange-400" />
          Price range
        </p>
        <div className="flex flex-wrap gap-1.5">
          {PRICE_RANGE_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => setPriceRangeFilter(opt.value)}
              className={`px-2.5 py-1.5 rounded-full text-[11px] font-medium transition-colors duration-150 ${
                priceRangeFilter === opt.value
                  ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                  : "bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Collapsible: Destination / Location / Duration / Best time */}
      <Accordion type="multiple" defaultValue={["destination"]} className="w-full">
        <AccordionItem value="destination" className="border-b border-gray-100 dark:border-slate-800">
          <AccordionTrigger className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider py-3 hover:no-underline hover:text-orange-500">
            Destination {selectedDestination && <span className="ml-1 text-orange-500 normal-case">· {selectedDestination}</span>}
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <PillList
              items={filteredDestinations}
              selected={selectedDestination}
              onSelect={setSelectedDestination}
              search={destinationSearch}
              setSearch={setDestinationSearch}
              placeholder="Search destinations..."
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location" className="border-b border-gray-100 dark:border-slate-800">
          <AccordionTrigger className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider py-3 hover:no-underline hover:text-orange-500">
            Location {selectedLocation && <span className="ml-1 text-orange-500 normal-case">· {selectedLocation}</span>}
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <PillList
              items={filteredLocations}
              selected={selectedLocation}
              onSelect={setSelectedLocation}
              search={locationSearch}
              setSearch={setLocationSearch}
              placeholder="Search locations..."
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="duration" className="border-b border-gray-100 dark:border-slate-800">
          <AccordionTrigger className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider py-3 hover:no-underline hover:text-orange-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              Duration
              {selectedDuration && <span className="ml-1 text-orange-500 normal-case">· {selectedDuration}</span>}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <PillList
              items={filteredDurations}
              selected={selectedDuration}
              onSelect={setSelectedDuration}
              search={durationSearch}
              setSearch={setDurationSearch}
              placeholder="Search durations..."
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="bestTime" className="border-none">
          <AccordionTrigger className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider py-3 hover:no-underline hover:text-orange-500">
            <span className="flex items-center gap-1.5">
              <CalendarClock className="w-3.5 h-3.5 text-orange-400" />
              Best time
              {selectedBestTime && <span className="ml-1 text-orange-500 normal-case">· {selectedBestTime}</span>}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-1">
            <PillList
              items={filteredBestTimes}
              selected={selectedBestTime}
              onSelect={setSelectedBestTime}
              search={bestTimeSearch}
              setSearch={setBestTimeSearch}
              placeholder="Search best times..."
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ExperienceFilters;