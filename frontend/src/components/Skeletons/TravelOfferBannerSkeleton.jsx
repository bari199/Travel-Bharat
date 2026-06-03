import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TravelOfferBannerSkeleton = () => {
  return (
    <section className="w-full py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[32px] bg-[#FFF7F2] border border-orange-100">

          {/* Left Content */}
          <div className="flex flex-col justify-center px-8 md:px-14 py-14">

            <Skeleton className="h-10 w-72 mb-3" />
            <Skeleton className="h-10 w-64 mb-3" />
            <Skeleton className="h-10 w-56" />

            <div className="mt-5 space-y-3">
              <Skeleton className="h-4 w-full max-w-md" />
              <Skeleton className="h-4 w-full max-w-sm" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="mt-8">
              <Skeleton className="h-12 w-36 rounded-full" />
            </div>

          </div>

          {/* Right Image */}
          <div className="relative h-[320px] md:h-[420px] lg:h-auto">
            <Skeleton className="w-full h-full rounded-none" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default TravelOfferBannerSkeleton;