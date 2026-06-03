import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TopTrendingSectionSkeleton = () => {
  return (
    <section className="w-full bg-[#f5dac4] py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Skeleton className="h-4 w-28 mb-3" />
            <Skeleton className="h-10 w-72" />
          </div>

          <Skeleton className="h-10 w-24 hidden sm:block" />
        </div>

        {/* Slider */}
        <div className="flex gap-6 overflow-hidden">

          {Array.from({ length: 4 }).map((_, index) => (
            <Card
              key={index}
              className="min-w-[280px] max-w-[280px] rounded-3xl border-0 overflow-hidden"
            >
              {/* Image */}
              <Skeleton className="w-full h-35" />

              <CardContent className="p-2">

                {/* Location */}
                <Skeleton className="h-4 w-24 mb-3" />

                {/* Title */}
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-3/4" />

                {/* Rating */}
                <div className="flex items-center gap-2 mt-4">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-24" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>

              </CardContent>
            </Card>
          ))}

        </div>
      </div>
    </section>
  );
};

export default TopTrendingSectionSkeleton;