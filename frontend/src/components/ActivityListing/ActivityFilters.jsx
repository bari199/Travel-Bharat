import React, { useState, useMemo } from "react";
import {
  SlidersHorizontal,
  Search,
  Sparkles,
  IndianRupee,
  Ticket,
  X,
  Waves,
  Mountain,
  Landmark,
  Trees,
  Snowflake,
  PawPrint,
  Tent,
  Footprints,
  Camera,
  Users,
  Eye,
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

/* ---------------------------------------------------------------------
   Fixed lists — mirrors the enums on the Activity mongoose model
   (activityModel.js) exactly, so a value picked here always matches
   what the backend will accept/return.
--------------------------------------------------------------------- */
export const ACTIVITY_CATEGORIES = [
  { value: "Adventure", label: "Adventure", icon: Mountain },
  { value: "Nature", label: "Nature", icon: Trees },
  { value: "Wildlife", label: "Wildlife", icon: PawPrint },
  { value: "Water Sports", label: "Water Sports", icon: Waves },
  { value: "Snow", label: "Snow", icon: Snowflake },
  { value: "Camping", label: "Camping", icon: Tent },
  { value: "Trekking", label: "Trekking", icon: Footprints },
  { value: "Spiritual", label: "Spiritual", icon: Sparkles },
  { value: "Cultural", label: "Cultural", icon: Landmark },
  { value: "Photography", label: "Photography", icon: Camera },
  { value: "Family", label: "Family", icon: Users },
  { value: "Sightseeing", label: "Sightseeing", icon: Eye },
];

export const ACTIVITY_TYPES = [
  "Outdoor",
  "Indoor",
  "Guided",
  "Self Guided",
  "Group",
  "Private",
];

export const DIFFICULTY_LEVELS = [
  "Easy",
  "Moderate",
  "Hard",
  "Challenging",
  "Difficult",
  "Expert",
];

/* Maps whatever category string is on an activity doc to one of the
   fixed buckets above (case-insensitive). Anything unrecognized falls
   back to "Sightseeing" rather than silently matching nothing. */
export const normalizeCategory = (raw) => {
  if (!raw) return "Sightseeing";
  const val = String(raw).trim().toLowerCase();
  const found = ACTIVITY_CATEGORIES.find((c) => c.value.toLowerCase() === val);
  return found ? found.value : "Sightseeing";
};

/* `price` on the model is a plain Number (not a "₹50"-style string like
   Destination's entryFee), so this filters directly on the number. */
export const PRICE_RANGES = [
  { value: "all", label: "Any price" },
  { value: "free", label: "Free" },
  { value: "low", label: "₹1 – ₹500" },
  { value: "mid", label: "₹500 – ₹1,500" },
  { value: "high", label: "₹1,500+" },
];

export const matchesPrice = (price, filterValue) => {
  if (!filterValue || filterValue === "all") return true;
  const amount = Number(price) || 0;
  if (filterValue === "free") return amount === 0;
  if (filterValue === "low") return amount > 0 && amount <= 500;
  if (filterValue === "mid") return amount > 500 && amount <= 1500;
  if (filterValue === "high") return amount > 1500;
  return true;
};

/* `bestTime` on the model is free text, not a fixed enum, so this stays
   a substring match the same way Destination matched bestTimeToVisit. */
const SEASONS = [
  { value: "summer", label: "Summer" },
  { value: "monsoon", label: "Monsoon" },
  { value: "winter", label: "Winter" },
];

/* Reusable searchable pill list — used for State / City */
const PillList = ({ items = [], selected, onSelect, search, setSearch, placeholder }) => (
  <div>
    {items.length > 6 && (
      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 text-gray-300 absolute left-3 top-1/2 -translate-y-1/2" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="h-8 pl-8 text-xs rounded-lg border-gray-200 focus-visible:ring-orange-500 focus-visible:ring-offset-0"
        />
      </div>
    )}
    <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
      {items.length === 0 && (
        <p className="text-xs text-gray-300 px-3 py-2">No matches</p>
      )}
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(selected === item ? "" : item)}
          className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors duration-150 ${
            selected === item
              ? "bg-orange-500 text-white font-medium shadow-sm shadow-orange-200"
              : "text-gray-600 hover:bg-orange-50 hover:text-orange-700"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
);

/* Reusable flat pill row — used for Activity Type / Difficulty / Season */
const PillRow = ({ options, selected, onSelect }) => (
  <div className="flex flex-wrap gap-1.5">
    {options.map((opt) => {
      const value = typeof opt === "string" ? opt : opt.value;
      const label = typeof opt === "string" ? opt : opt.label;
      const active = selected === value;
      return (
        <button
          type="button"
          key={value}
          onClick={() => onSelect(active ? "" : value)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 ${
            active
              ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
              : "bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-700"
          }`}
        >
          {label}
        </button>
      );
    })}
  </div>
);

/* Toggle switch with explicit track colors for BOTH states, so it never
   blends into the white card the way the theme's default bg-input can. */
const FilterToggle = ({ id, label, icon: Icon, checked, onCheckedChange }) => (
  <div className="flex items-center justify-between">
    <label htmlFor={id} className="text-sm text-gray-600 cursor-pointer flex items-center gap-1.5">
      {Icon && <Icon className="w-3.5 h-3.5 text-orange-400" />}
      {label}
    </label>
    <Switch
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-gray-300 border border-transparent [&>span]:bg-white [&>span]:shadow-md"
    />
  </div>
);

const ActivityFilters = ({
  states = [],
  cities = [],
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
  selectedCategory,
  setSelectedCategory,
  selectedActivityType,
  setSelectedActivityType,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedSeason,
  setSelectedSeason,
  priceFilter,
  setPriceFilter,
  freeOnly,
  setFreeOnly,
  sortByNewest,
  setSortByNewest,
}) => {
  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const filteredStates = useMemo(
    () => states.filter((s) => s.toLowerCase().includes(stateSearch.toLowerCase())),
    [states, stateSearch]
  );
  const filteredCities = useMemo(
    () => cities.filter((c) => c.toLowerCase().includes(citySearch.toLowerCase())),
    [cities, citySearch]
  );

  const activeChips = [
    selectedState && { key: "state", label: selectedState, clear: () => setSelectedState("") },
    selectedCity && { key: "city", label: selectedCity, clear: () => setSelectedCity("") },
    selectedCategory && { key: "category", label: selectedCategory, clear: () => setSelectedCategory("") },
    selectedActivityType && {
      key: "activityType",
      label: selectedActivityType,
      clear: () => setSelectedActivityType(""),
    },
    selectedDifficulty && {
      key: "difficulty",
      label: selectedDifficulty,
      clear: () => setSelectedDifficulty(""),
    },
    selectedSeason && {
      key: "season",
      label: SEASONS.find((s) => s.value === selectedSeason)?.label || selectedSeason,
      clear: () => setSelectedSeason(""),
    },
    priceFilter !== "all" && {
      key: "price",
      label: PRICE_RANGES.find((o) => o.value === priceFilter)?.label,
      clear: () => setPriceFilter("all"),
    },
    freeOnly && { key: "free", label: "Free only", clear: () => setFreeOnly(false) },
    sortByNewest && { key: "newest", label: "Newest first", clear: () => setSortByNewest(false) },
  ].filter(Boolean);

  const resetAll = () => {
    setSelectedState("");
    setSelectedCity("");
    setSelectedCategory("");
    setSelectedActivityType("");
    setSelectedDifficulty("");
    setSelectedSeason("");
    setPriceFilter("all");
    setFreeOnly(false);
    setSortByNewest(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-orange-100 p-5 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
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
          className="text-xs text-orange-500 hover:text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1 rounded-full font-medium transition-colors"
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
                className="flex items-center gap-1 bg-orange-50 text-orange-700 text-[11px] font-medium pl-2.5 pr-1.5 py-1 rounded-full hover:bg-orange-100 transition-colors"
              >
                {chip.label}
                <X className="w-3 h-3" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick toggles */}
      <div className="mb-5 pb-5 border-b border-gray-100 space-y-3">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Special</p>
        <FilterToggle id="freeOnly" label="Free only" icon={Ticket} checked={freeOnly} onCheckedChange={setFreeOnly} />
        <FilterToggle id="newest" label="Newly added" icon={Sparkles} checked={sortByNewest} onCheckedChange={setSortByNewest} />
      </div>

      {/* Category — fixed icon grid, mirrors the model's category enum */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Category</p>
        <div className="grid grid-cols-2 gap-2">
          {ACTIVITY_CATEGORIES.map(({ value, label, icon: Icon }) => {
            const active = selectedCategory === value;
            return (
              <button
                type="button"
                key={value}
                onClick={() => setSelectedCategory(active ? "" : value)}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-medium transition-colors duration-150 ${
                  active
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                    : "bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-700"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? "text-white" : "text-orange-400"}`} />
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Activity type */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Activity type</p>
        <PillRow options={ACTIVITY_TYPES} selected={selectedActivityType} onSelect={setSelectedActivityType} />
      </div>

      {/* Difficulty */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Difficulty</p>
        <PillRow options={DIFFICULTY_LEVELS} selected={selectedDifficulty} onSelect={setSelectedDifficulty} />
      </div>

      {/* Price */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <IndianRupee className="w-3.5 h-3.5 text-orange-400" />
          Price
        </p>
        <div className="flex flex-wrap gap-1.5">
          {PRICE_RANGES.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => setPriceFilter(opt.value)}
              className={`px-2.5 py-1.5 rounded-full text-[11px] font-medium transition-colors duration-150 ${
                priceFilter === opt.value
                  ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                  : "bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Collapsible: State / City / Best time */}
      <Accordion type="multiple" defaultValue={["state"]} className="w-full">
        <AccordionItem value="state" className="border-b border-gray-100">
          <AccordionTrigger className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider py-3 hover:no-underline hover:text-orange-500">
            State {selectedState && <span className="ml-1 text-orange-500 normal-case">· {selectedState}</span>}
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <PillList
              items={filteredStates}
              selected={selectedState}
              onSelect={setSelectedState}
              search={stateSearch}
              setSearch={setStateSearch}
              placeholder="Search states..."
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="city" className="border-b border-gray-100">
          <AccordionTrigger className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider py-3 hover:no-underline hover:text-orange-500">
            City {selectedCity && <span className="ml-1 text-orange-500 normal-case">· {selectedCity}</span>}
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <PillList
              items={filteredCities}
              selected={selectedCity}
              onSelect={setSelectedCity}
              search={citySearch}
              setSearch={setCitySearch}
              placeholder="Search cities..."
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="season" className="border-none">
          <AccordionTrigger className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider py-3 hover:no-underline hover:text-orange-500">
            Best time
          </AccordionTrigger>
          <AccordionContent className="pb-1">
            <PillRow options={SEASONS} selected={selectedSeason} onSelect={setSelectedSeason} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ActivityFilters;