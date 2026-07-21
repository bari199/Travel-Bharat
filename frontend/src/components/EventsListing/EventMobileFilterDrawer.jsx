import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import EventFilters from "@/components/EventsListing/EventFilters";

const EventMobileFilterDrawer = ({
  filters,
  setFilters,
  categories = [],
  states = [],
  cities = [],
}) => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-11 rounded-xl"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[320px] overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle>
              Filter Events
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6">
            <EventFilters
              filters={filters}
              setFilters={setFilters}
              categories={categories}
              states={states}
              cities={cities}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EventMobileFilterDrawer;