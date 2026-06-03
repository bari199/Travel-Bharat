import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TravelArticlesSectionSkeleton = () => {
  return (
    <section className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <Skeleton className="h-4 w-28 mb-4" />
            <Skeleton className="h-10 w-64" />
          </div>

          <Skeleton className="hidden md:block h-10 w-28 rounded-md" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[24px] overflow-hidden border border-orange-100 max-w-[360px] mx-auto w-full"
            >
              {/* Image */}
              <Skeleton className="w-full h-[220px]" />

              {/* Content */}
              <div className="p-5">
                <Skeleton className="h-4 w-24 mb-4" />

                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-4/5 mb-5" />

                <Skeleton className="h-5 w-28" />
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default TravelArticlesSectionSkeleton;