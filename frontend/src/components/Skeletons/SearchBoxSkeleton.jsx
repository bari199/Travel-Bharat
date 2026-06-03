// components/skeletons/SearchBoxSkeleton.jsx

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SearchBoxSkeleton = () => {
  return (
    <div className="w-full flex flex-col items-center px-4 relative">

      <div className="w-full max-w-5xl bg-white border rounded-2xl shadow-sm px-3 py-2 flex flex-col lg:flex-row items-center gap-2">

        {/* State */}
        <div className="flex items-center gap-2 w-full lg:border-r lg:pr-4">
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />

          <div className="w-full">
            <Skeleton className="h-3 w-12 mb-2" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>

        {/* City */}
        <div className="flex items-center gap-2 w-full lg:border-r lg:pr-4">
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />

          <div className="w-full">
            <Skeleton className="h-3 w-12 mb-2" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>

        {/* Category */}
        <div className="flex items-center gap-2 w-full lg:border-r lg:pr-4">
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />

          <div className="w-full">
            <Skeleton className="h-3 w-20 mb-2" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-center gap-2 w-full">
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />

          <div className="w-full">
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>

        {/* Search Button */}
        <Skeleton className="h-10 w-full lg:w-28 rounded-xl" />
      </div>

      {/* Fake Results */}
      <div className="mt-10 w-full max-w-5xl space-y-4">

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="border rounded-xl p-4"
          >
            <Skeleton className="h-6 w-52 mb-3" />
            <Skeleton className="h-4 w-36 mb-2" />
            <Skeleton className="h-4 w-40" />
          </div>
        ))}

      </div>
    </div>
  );
};

export default SearchBoxSkeleton;