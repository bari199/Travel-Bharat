import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TrendingDestinationsSkeleton = () => {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-8 w-24" />
        </div>

        {/* Destinations */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8">

          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <Skeleton className="w-28 h-28 rounded-full" />

              <div className="mt-4 flex flex-col items-center">
                <Skeleton className="h-5 w-20 mb-2" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}

        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-14">
          <Skeleton className="w-7 h-2 rounded-full" />
          <Skeleton className="w-2 h-2 rounded-full" />
          <Skeleton className="w-2 h-2 rounded-full" />
          <Skeleton className="w-2 h-2 rounded-full" />
          <Skeleton className="w-2 h-2 rounded-full" />
        </div>

      </div>
    </section>
  );
};

export default TrendingDestinationsSkeleton;