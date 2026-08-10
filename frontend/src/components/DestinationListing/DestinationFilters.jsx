import React, { useState, useMemo } from "react";
import {
  SlidersHorizontal,
  Search,
  Star,
  Sparkles,
  Ticket,
  X,
  Waves,
  Mountain as MountainIcon,
  Landmark,
  Trees,
  Sun,
  PawPrint,
  MapPin,
  IndianRupee,
  CalendarDays,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
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
   Fixed category list. Exported so DestinationListing can use the same
   source of truth when filtering — no more mismatched strings.
--------------------------------------------------------------------- */
export const CATEGORIES = [
  { value: "Beach", label: "Beach", icon: Waves },
  { value: "Mountain", label: "Mountain", icon: MountainIcon },
  { value: "Heritage", label: "Heritage", icon: Landmark },
  { value: "Forest", label: "Forest", icon: Trees },
  { value: "Desert", label: "Desert", icon: Sun },
  { value: "Wildlife", label: "Wildlife", icon: PawPrint },
  { value: "Spiritual", label: "Spiritual", icon: Sparkles },
  { value: "Other", label: "Other", icon: MapPin },
];


export const normalizeCategory = (raw) => {
  if (!raw) return "Other";
  const val = String(raw).trim().toLowerCase();
  const found = CATEGORIES.find((c) => c.value.toLowerCase() === val);
  return found ? found.value : "Other";
};

/* Turns an entryFee string ("Free", "₹50", "₹1,200") into a plain number */
export const parseEntryFee = (feeStr) => {
  if (!feeStr) return 0;
  const str = String(feeStr).toLowerCase();
  if (str.includes("free")) return 0;
  const match = str.match(/[\d,]+/);
  if (!match) return 0;
  return parseInt(match[0].replace(/,/g, ""), 10) || 0;
};

export const ENTRY_FEE_OPTIONS = [
  { value: "all", label: "Any price" },
  { value: "free", label: "Free" },
  { value: "low", label: "₹1 – ₹100" },
  { value: "mid", label: "₹100 – ₹500" },
  { value: "high", label: "₹500+" },
];

export const matchesEntryFee = (feeStr, filterValue) => {
  if (!filterValue || filterValue === "all") return true;
  const amount = parseEntryFee(feeStr);
  if (filterValue === "free") return amount === 0;
  if (filterValue === "low") return amount > 0 && amount <= 100;
  if (filterValue === "mid") return amount > 100 && amount <= 500;
  if (filterValue === "high") return amount > 500;
  return true;
};

const SEASONS = [
  { value: "summer", label: "Summer" },
  { value: "monsoon", label: "Monsoon" },
  { value: "winter", label: "Winter" },
];

export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/* Reusable searchable pill list — used for State / City / Area */
const PillList = ({ items = [], selected, onSelect, search, setSearch, placeholder }) => (
  <div>
    {items.length > 6 && (
      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 text-gray-300 dark:text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="h-8 pl-8 text-xs rounded-lg border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 focus-visible:ring-orange-500 focus-visible:ring-offset-0"
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
              : "text-gray-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-700 dark:hover:text-orange-400"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
);

/* Toggle switch with explicit track colors for BOTH states, so it never
   blends into the white card the way the theme's default bg-input can. */
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

const DestinationFilters = ({
  states = [],
  cities = [],
  areas = [],
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
  selectedCategory,
  setSelectedCategory,
  selectedArea,
  setSelectedArea,
  selectedSeason,
  setSelectedSeason,
  selectedMonths = [],
  setSelectedMonths,
  minRating,
  setMinRating,
  entryFeeFilter,
  setEntryFeeFilter,
  freeEntryOnly,
  setFreeEntryOnly,
  featuredOnly,
  setFeaturedOnly,
  sortByNewest,
  setSortByNewest,
}) => {
  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [areaSearch, setAreaSearch] = useState("");

  const filteredStates = useMemo(
    () => states.filter((s) => s.toLowerCase().includes(stateSearch.toLowerCase())),
    [states, stateSearch]
  );
  const filteredCities = useMemo(
    () => cities.filter((c) => c.toLowerCase().includes(citySearch.toLowerCase())),
    [cities, citySearch]
  );
  const filteredAreas = useMemo(
    () => areas.filter((a) => a.toLowerCase().includes(areaSearch.toLowerCase())),
    [areas, areaSearch]
  );

  const toggleMonth = (month) => {
    setSelectedMonths(
      selectedMonths.includes(month)
        ? selectedMonths.filter((m) => m !== month)
        : [...selectedMonths, month]
    );
  };

  const activeChips = [
    selectedState && { key: "state", label: selectedState, clear: () => setSelectedState("") },
    selectedCity && { key: "city", label: selectedCity, clear: () => setSelectedCity("") },
    selectedCategory && { key: "category", label: selectedCategory, clear: () => setSelectedCategory("") },
    selectedArea && { key: "area", label: selectedArea, clear: () => setSelectedArea("") },
    selectedSeason && {
      key: "season",
      label: SEASONS.find((s) => s.value === selectedSeason)?.label || selectedSeason,
      clear: () => setSelectedSeason(""),
    },
    selectedMonths.length > 0 && {
      key: "months",
      label: selectedMonths.join(", "),
      clear: () => setSelectedMonths([]),
    },
    minRating > 0 && { key: "rating", label: `${minRating}★ & up`, clear: () => setMinRating(0) },
    entryFeeFilter !== "all" && {
      key: "fee",
      label: ENTRY_FEE_OPTIONS.find((o) => o.value === entryFeeFilter)?.label,
      clear: () => setEntryFeeFilter("all"),
    },
    freeEntryOnly && { key: "free", label: "Free entry", clear: () => setFreeEntryOnly(false) },
    featuredOnly && { key: "featured", label: "Featured", clear: () => setFeaturedOnly(false) },
    sortByNewest && { key: "newest", label: "Newest first", clear: () => setSortByNewest(false) },
  ].filter(Boolean);

  const resetAll = () => {
    setSelectedState("");
    setSelectedCity("");
    setSelectedCategory("");
    setSelectedArea("");
    setSelectedSeason("");
    setSelectedMonths([]);
    setMinRating(0);
    setEntryFeeFilter("all");
    setFreeEntryOnly(false);
    setFeaturedOnly(false);
    setSortByNewest(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-orange-100 dark:border-slate-700 p-5 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
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
          className="text-xs text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 bg-orange-50 dark:bg-orange-500/10 hover:bg-orange-100 dark:hover:bg-orange-500/20 px-3 py-1 rounded-full font-medium transition-colors"
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
                className="flex items-center gap-1 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 text-[11px] font-medium pl-2.5 pr-1.5 py-1 rounded-full hover:bg-orange-100 dark:hover:bg-orange-500/20 transition-colors"
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
        <FilterToggle id="featured" label="Featured only" checked={featuredOnly} onCheckedChange={setFeaturedOnly} />
        <FilterToggle id="freeEntry" label="Free entry" icon={Ticket} checked={freeEntryOnly} onCheckedChange={setFreeEntryOnly} />
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
                    : "bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-700 dark:hover:text-orange-400"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? "text-white" : "text-orange-400"}`} />
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimum rating */}
      <div className="mb-5 pb-5 border-b border-gray-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Minimum rating</p>
          <span className="flex items-center gap-1 text-xs font-medium text-orange-600 dark:text-orange-400">
            <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            {minRating > 0 ? minRating.toFixed(1) : "Any"}
          </span>
        </div>
        <Slider
          value={[minRating]}
          onValueChange={([v]) => setMinRating(v)}
          min={0}
          max={5}
          step={0.5}
          className="mb-3 [&_[role=slider]]:bg-orange-500 [&_[role=slider]]:border-orange-500 [&>span:first-child]:bg-orange-100 dark:[&>span:first-child]:bg-slate-700 [&>span:first-child_span]:bg-orange-500"
        />
        <div className="flex flex-wrap gap-1.5">
          {[3, 3.5, 4, 4.5].map((r) => (
            <button
              type="button"
              key={r}
              onClick={() => setMinRating(minRating === r ? 0 : r)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors duration-150 ${
                minRating === r
                  ? "bg-orange-500 text-white"
                  : "bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-700 dark:hover:text-orange-400"
              }`}
            >
              {r}★+
            </button>
          ))}
        </div>
      </div>

      {/* Entry fee */}
      <div className="mb-5 pb-5 border-b border-gray-100 dark:border-slate-800">
        <p className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <IndianRupee className="w-3.5 h-3.5 text-orange-400" />
          Entry fee
        </p>
        <div className="flex flex-wrap gap-1.5">
          {ENTRY_FEE_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => setEntryFeeFilter(opt.value)}
              className={`px-2.5 py-1.5 rounded-full text-[11px] font-medium transition-colors duration-150 ${
                entryFeeFilter === opt.value
                  ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                  : "bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-700 dark:hover:text-orange-400"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Collapsible: State / City / Area / Best time / Best month */}
      <Accordion type="multiple" defaultValue={["state"]} className="w-full">
        <AccordionItem value="state" className="border-b border-gray-100 dark:border-slate-800">
          <AccordionTrigger className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider py-3 hover:no-underline hover:text-orange-500">
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

        <AccordionItem value="city" className="border-b border-gray-100 dark:border-slate-800">
          <AccordionTrigger className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider py-3 hover:no-underline hover:text-orange-500">
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

        <AccordionItem value="area" className="border-b border-gray-100 dark:border-slate-800">
          <AccordionTrigger className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider py-3 hover:no-underline hover:text-orange-500">
            Area {selectedArea && <span className="ml-1 text-orange-500 normal-case">· {selectedArea}</span>}
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <PillList
              items={filteredAreas}
              selected={selectedArea}
              onSelect={setSelectedArea}
              search={areaSearch}
              setSearch={setAreaSearch}
              placeholder="Search areas..."
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="season" className="border-b border-gray-100 dark:border-slate-800">
          <AccordionTrigger className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider py-3 hover:no-underline hover:text-orange-500">
            Best time to visit
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <div className="flex flex-wrap gap-2">
              {SEASONS.map((season) => (
                <button
                  type="button"
                  key={season.value}
                  onClick={() => setSelectedSeason(selectedSeason === season.value ? "" : season.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 ${
                    selectedSeason === season.value
                      ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                      : "bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-700 dark:hover:text-orange-400"
                  }`}
                >
                  {season.label}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="month" className="border-none">
          <AccordionTrigger className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider py-3 hover:no-underline hover:text-orange-500">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-orange-400" />
              Best month
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-1">
            <div className="grid grid-cols-4 gap-1.5">
              {MONTHS.map((month) => (
                <button
                  type="button"
                  key={month}
                  onClick={() => toggleMonth(month)}
                  className={`px-2 py-1.5 rounded-lg text-[11px] font-medium transition-colors duration-150 ${
                    selectedMonths.includes(month)
                      ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                      : "bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-700 dark:hover:text-orange-400"
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DestinationFilters;