import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PopularToursSkeleton = () => {
  return (
    <section className="w-full py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-8 w-24" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {Array.from({ length: 4 }).map((_, index) => (
            <Card
              key={index}
              className="rounded-2xl border border-slate-200 overflow-hidden"
            >
              <CardContent className="px-2 pt-0">

                {/* Image */}
                <div className="relative">
                  <Skeleton className="w-full h-45 rounded-xl" />

                  <Skeleton className="absolute bottom-3 right-3 h-8 w-8 rounded-full" />
                </div>

                {/* Location */}
                <div className="mt-4">
                  <Skeleton className="h-3 w-24" />
                </div>

                {/* Title */}
                <div className="mt-3 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-12" />
                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between border-t border-slate-200 mt-4 pt-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>

              </CardContent>
            </Card>
          ))}

        </div>
      </div>
    </section>
  );
};

export default PopularToursSkeleton;