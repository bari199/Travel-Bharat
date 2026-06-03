import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PopularThingsToDoSkeleton = () => {
  return (
    <section className="w-full py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-8 w-20" />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]">

          {/* Left Small */}
          <Card className="overflow-hidden rounded-2xl border-0 h-[220px]">
            <Skeleton className="w-full h-full" />
          </Card>

          {/* Center Large */}
          <Card className="overflow-hidden rounded-2xl border-0 row-span-2 h-[460px]">
            <Skeleton className="w-full h-full" />
          </Card>

          {/* Top Right */}
          <Card className="overflow-hidden rounded-2xl border-0 h-[220px]">
            <Skeleton className="w-full h-full" />
          </Card>

          {/* Bottom Left */}
          <Card className="overflow-hidden rounded-2xl border-0 h-[220px]">
            <Skeleton className="w-full h-full" />
          </Card>

          {/* Bottom Middle */}
          <Card className="overflow-hidden rounded-2xl border-0 h-[220px]">
            <Skeleton className="w-full h-full" />
          </Card>

          {/* Bottom Right Landscape */}
          <Card className="overflow-hidden rounded-2xl border-0 col-span-2 md:col-span-2 h-[220px]">
            <Skeleton className="w-full h-full" />
          </Card>

        </div>
      </div>
    </section>
  );
};

export default PopularThingsToDoSkeleton;