// components/skeletons/HeroSkeleton.jsx

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HeroSkeleton = () => {
  return (
    <section className="w-full bg-white py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 md:px-5">
        <div className="flex flex-col items-center">

          <Skeleton className="h-8 w-56 mb-4 rounded-lg" />

          <div className="relative w-full max-w-5xl">
            <Skeleton className="w-full h-[400px] md:h-[450px] rounded-3xl" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <Skeleton className="h-10 w-72" />
              <Skeleton className="h-5 w-52" />
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>

            <Skeleton className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full" />
            <Skeleton className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;