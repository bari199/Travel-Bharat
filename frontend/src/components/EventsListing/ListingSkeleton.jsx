import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const EventCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-orange-100 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">
      {/* Image */}
      <Skeleton className="h-44 w-full rounded-none" />

      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-5 w-3/4" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-11/12" />
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Skeleton className="h-8 w-full rounded-lg" />
          <Skeleton className="h-8 w-full rounded-lg" />
          <Skeleton className="h-8 w-full rounded-lg" />
          <Skeleton className="h-8 w-full rounded-lg" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-800">
          <Skeleton className="h-3.5 w-20" />
        </div>

        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </div>
  );
};

const ListingSkeleton = ({ count = 9 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ListingSkeleton;