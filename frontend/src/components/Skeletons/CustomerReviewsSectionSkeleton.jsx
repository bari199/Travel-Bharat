import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CustomerReviewsSectionSkeleton = () => {
  return (
    <section className="w-full bg-[#f8f8f8] py-20 px-4 md:px-10 rounded-[30px] overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative">

        {/* Heading */}
        <div className="mb-16 flex flex-col items-center">
          <Skeleton className="h-4 w-28 mb-5" />
          <Skeleton className="h-10 w-64" />
        </div>

        {/* Floating Avatars */}
        <div className="absolute inset-0 hidden md:block pointer-events-none">
          <Skeleton className="absolute top-10 left-10 w-14 h-14 rounded-full" />
          <Skeleton className="absolute top-0 left-1/3 w-14 h-14 rounded-full" />
          <Skeleton className="absolute top-20 right-16 w-14 h-14 rounded-full" />
          <Skeleton className="absolute bottom-20 left-20 w-14 h-14 rounded-full" />
          <Skeleton className="absolute bottom-10 right-24 w-14 h-14 rounded-full" />
        </div>

        {/* Review Card */}
        <Card className="max-w-2xl mx-auto border-0 shadow-none bg-transparent">
          <CardContent className="flex flex-col items-center">

            {/* Avatar */}
            <Skeleton className="w-24 h-24 rounded-full" />

            {/* Rating */}
            <div className="flex gap-2 mt-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-5 h-5 rounded"
                />
              ))}
            </div>

            {/* Review */}
            <div className="mt-6 space-y-3 w-full max-w-xl">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5 mx-auto" />
            </div>

            {/* User */}
            <div className="mt-6 flex flex-col items-center">
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-28" />
            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-8">
              <Skeleton className="h-2.5 w-8 rounded-full" />
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
            </div>

          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CustomerReviewsSectionSkeleton;