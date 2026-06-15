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

import DestinationFilters from "./DestinationFilters";

const MobileFilterDrawer = ({
  states,
  categories,

  selectedState,
  setSelectedState,

  selectedCategory,
  setSelectedCategory,

  featuredOnly,
  setFeaturedOnly,
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
            Filter Destinations
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6">

          <DestinationFilters
            states={states}
            categories={categories}
            selectedState={
              selectedState
            }
            setSelectedState={
              setSelectedState
            }
            selectedCategory={
              selectedCategory
            }
            setSelectedCategory={
              setSelectedCategory
            }
            featuredOnly={
              featuredOnly
            }
            setFeaturedOnly={
              setFeaturedOnly
            }
          />

        </div>

      </SheetContent>

    </Sheet>
  );
};

export default MobileFilterDrawer;