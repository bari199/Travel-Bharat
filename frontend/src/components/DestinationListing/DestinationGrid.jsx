import React from "react";
import DestinationCard from "./DestinationCard";

const DestinationGrid = ({ destinations }) => {
  if (!destinations.length) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-10 text-center border border-transparent dark:border-slate-700">
        <h3 className="text-xl font-semibold dark:text-white">No Destinations Found</h3>
        <p className="text-gray-500 dark:text-slate-400 mt-2">Try changing your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {destinations.map((destination) => (
        <DestinationCard key={destination._id} destination={destination} />
      ))}
    </div>
  );
};

// Memoized: only re-renders when the `destinations` array reference
// actually changes (i.e. after filtering/pagination), not on every
// keystroke or unrelated state update elsewhere on the page.
export default React.memo(DestinationGrid);