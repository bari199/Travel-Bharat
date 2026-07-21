import React from "react";

const ListingSkeleton = () => {
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >
      {[...Array(9)].map((_, index) => (
        <div
          key={index}
          className="
            bg-white dark:bg-slate-900
            rounded-3xl
            overflow-hidden
            border border-gray-200 dark:border-slate-700
            animate-pulse
          "
        >
          {/* Image */}

          <div className="h-60 bg-gray-200 dark:bg-slate-700" />

          {/* Content */}

          <div className="p-5">

            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded mb-4 w-32" />

            <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded mb-4 w-48" />

            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded mb-2" />

            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded mb-2" />

            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded mb-5 w-2/3" />

            <div className="space-y-3 mb-5">

              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded" />

              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded" />

              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded" />

            </div>

            <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded-xl" />

          </div>

        </div>
      ))}
    </div>
  );
};

export default ListingSkeleton;