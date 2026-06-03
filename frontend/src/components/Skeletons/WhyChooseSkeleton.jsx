import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const WhyChooseSkeleton = () => {
  return (
    <section className="w-full py-16 px-4 lg:px-16 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <Skeleton className="h-10 w-80 mb-12" />

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {[1, 2, 3, 4].map((item) => (
            <div key={item}>

              {/* Icon */}
              <Skeleton className="h-10 w-10 rounded-lg mb-5" />

              {/* Title */}
              <Skeleton className="h-7 w-36 mb-3" />

              {/* Description */}
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-4/5" />

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default WhyChooseSkeleton;