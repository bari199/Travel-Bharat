import React from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import { SlidersHorizontal } from "lucide-react";

import ExperienceFilters from "./ExperienceFilters";

const ExperienceMobileFilterDrawer = ({
  destinations,
  locations,
  durations,
  bestTimes,

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
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[320px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Experiences</SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          <ExperienceFilters
            destinations={destinations}
            locations={locations}
            durations={durations}
            bestTimes={bestTimes}
            selectedDestination={selectedDestination}
            setSelectedDestination={setSelectedDestination}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedDuration={selectedDuration}
            setSelectedDuration={setSelectedDuration}
            selectedBestTime={selectedBestTime}
            setSelectedBestTime={setSelectedBestTime}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            priceRangeFilter={priceRangeFilter}
            setPriceRangeFilter={setPriceRangeFilter}
            freeOnly={freeOnly}
            setFreeOnly={setFreeOnly}
            sortByNewest={sortByNewest}
            setSortByNewest={setSortByNewest}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ExperienceMobileFilterDrawer;
