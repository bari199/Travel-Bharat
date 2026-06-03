import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

import TravelOfferBannerSkeleton from "../skeletons/TravelOfferBannerSkeleton";

const TravelOfferBanner = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <TravelOfferBannerSkeleton />;
  }

  return (
    <section className="w-full py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[32px] bg-[#FFF7F2] border border-orange-100">

          {/* Left Content */}
          <div className="flex flex-col justify-center px-8 md:px-14 py-14">

            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-slate-900">
              Grab up to{" "}
              <span className="text-orange-500">35% off</span>
              <br />
              on your favorite
              <br />
              Indian Destination
            </h2>

            <p className="text-slate-500 mt-5 text-sm md:text-base max-w-md leading-7">
              Explore Kashmir valleys, Goa beaches, Rajasthan heritage,
              Kerala backwaters, and many more unforgettable places
              across India.
            </p>

            <div className="mt-8">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-7 py-6 text-sm font-medium shadow-none">
                Book Now
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

          </div>

          {/* Right Image */}
          <div className="relative h-[320px] md:h-[420px] lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1400"
              alt="Travel Bharat"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/5"></div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TravelOfferBanner;