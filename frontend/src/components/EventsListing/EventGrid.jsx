import React from "react";

import EventCard from "./EventCard";
import ListingSkeleton from "./ListingSkeleton";

const EventGrid = ({
  events,
  loading,
}) => {
  if (loading) {
    return <ListingSkeleton count={9} />;
  }

  if (!events?.length) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-10 text-center border border-dashed border-orange-200 dark:border-slate-700">
        <div className="w-14 h-14 mx-auto rounded-full bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3M5 11h14M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
            />
          </svg>
        </div>

        <h3 className="text-xl font-semibold dark:text-white">
          No Events Found
        </h3>

        <p className="text-gray-500 dark:text-slate-400 mt-2">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Result Count */}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Explore Events
        </h2>

        <span className="text-sm font-medium text-gray-500 dark:text-slate-400">
          {events.length}{" "}
          {events.length === 1 ? "Event" : "Events"} Found
        </span>
      </div>

      {/* Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
          />
        ))}
      </div>
    </>
  );
};

export default React.memo(EventGrid);