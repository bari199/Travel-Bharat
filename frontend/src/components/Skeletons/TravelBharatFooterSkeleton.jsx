import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TravelBharatFooterSkeleton = () => {
  return (
    <footer className="w-full bg-[#faf7f5] pt-20 pb-8 px-4 md:px-8 rounded-t-[40px] overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Top CTA */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 border-b border-gray-200 pb-12">

          <div className="flex items-start gap-4">
            <Skeleton className="w-14 h-14 rounded-2xl" />

            <div>
              <Skeleton className="h-8 w-64 mb-3" />
              <Skeleton className="h-4 w-80 mb-2" />
              <Skeleton className="h-4 w-60" />
            </div>
          </div>

          <div>
            <Skeleton className="h-5 w-24 mb-5" />

            <div className="flex gap-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="w-12 h-12 rounded-full" />
            </div>
          </div>

        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-14">

          {[1, 2, 3, 4].map((item) => (
            <div key={item}>
              <Skeleton className="h-7 w-32 mb-6" />

              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-5">

          <Skeleton className="h-4 w-56" />

          <div className="flex gap-5">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>

        </div>

      </div>
    </footer>
  );
};

export default TravelBharatFooterSkeleton;