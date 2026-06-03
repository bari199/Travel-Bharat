import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  Heart,
  MapPin,
  Clock3,
  Star,
} from "lucide-react";

import { tours } from "../../data/data";

import PopularToursSkeleton from "../skeletons/PopularToursSkeleton";

const PopularTours = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PopularToursSkeleton />;
  }

  return (
    <section className="w-full py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Find Popular Tours
          </h2>

          <button className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-black transition">
            See all
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {tours.map((tour, index) => (
            <Card
              key={index}
              className="rounded-2xl border border-slate-200 shadow-none hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <CardContent className="px-2 pt-0">

                {/* Image */}
                <div className="relative">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-45 object-cover rounded-xl"
                  />

                  <button className="absolute bottom-3 right-3 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
                    <Heart className="w-4 h-4 text-slate-600" />
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-4">
                  <MapPin className="w-3 h-3" />
                  <span>{tour.location}</span>
                </div>

                {/* Title */}
                <h3 className="text-[15px] leading-6 font-semibold text-slate-900 mt-2 line-clamp-2 min-h-[32px]">
                  {tour.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-[2px] text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-3.5 h-3.5 fill-yellow-400 stroke-yellow-400"
                      />
                    ))}
                  </div>

                  <span className="text-sm text-slate-700 font-medium">
                    {tour.rating}
                  </span>

                  <span className="text-sm text-slate-500">
                    {tour.reviews}
                  </span>
                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between border-t border-slate-200 mt-2 pt-2">

                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Clock3 className="w-4 h-4" />
                    <span>{tour.days}</span>
                  </div>

                  <div className="text-sm text-slate-500">
                    From{" "}
                    <span className="font-semibold text-slate-900">
                      {tour.price}
                    </span>
                  </div>

                </div>

              </CardContent>
            </Card>
          ))}

        </div>
      </div>
    </section>
  );
}

export default PopularTours;