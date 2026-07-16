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

import ActivityFilters from "./ActivityFilters";

const MobileFilterDrawer = ({
  states,
  cities,

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
  return (
    <Sheet>

      <SheetTrigger asChild>

        <Button
          variant="outline"
          className="w-full"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
        </Button>

      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[320px] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>
            Filter Activities
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6">

          <ActivityFilters
            states={states}
            cities={cities}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedActivityType={selectedActivityType}
            setSelectedActivityType={setSelectedActivityType}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            selectedSeason={selectedSeason}
            setSelectedSeason={setSelectedSeason}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
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

export default MobileFilterDrawer;