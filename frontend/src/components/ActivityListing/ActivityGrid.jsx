import React from "react";
import ActivityCard from "./ActivityCard";

const ActivityGrid = ({ activities }) => {
  if (!activities.length) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center">
        <h3 className="text-xl font-semibold">No Activities Found</h3>
        <p className="text-gray-500 mt-2">Try changing your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {activities.map((activity) => (
        <ActivityCard key={activity._id} activity={activity} />
      ))}
    </div>
  );
};

// Memoized: only re-renders when the `activities` array reference
// actually changes (i.e. after filtering/pagination), not on every
// keystroke or unrelated state update elsewhere on the page.
export default React.memo(ActivityGrid);