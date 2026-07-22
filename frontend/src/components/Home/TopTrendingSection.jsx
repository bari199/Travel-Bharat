import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Star,
  Clock3,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { trendingDestinations } from "../../data/data";
import TopTrendingSectionSkeleton from "../Skeletons/TopTrendingSectionSkeleton";

const TopTrendingSection = () => {
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;

      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return <TopTrendingSectionSkeleton />;
  }

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-orange-200 via-orange-300 to-orange-300 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 py-16 px-4 md:px-8 transition-colors duration-300">

      {/* Decorative sun + skyline scallop, top-left */}
      <div className="pointer-events-none absolute -top-10 -left-10 w-64 h-64 overflow-hidden opacity-90">
        <div className="absolute top-2 left-2 w-24 h-24 rounded-full bg-orange-600/70 dark:bg-orange-500/40" />
        <svg
          viewBox="0 0 260 200"
          className="absolute inset-0 w-full h-full text-orange-500/30 dark:text-orange-400/20"
          fill="none"
        >
          <path
            d="M0 120 Q20 60 40 120 T80 120 T120 120 T160 120 T200 120 T240 120"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M10 140 Q30 90 50 140 T90 140 T130 140 T170 140 T210 140 T250 140"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Decorative city skyline, bottom */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-24 text-orange-700/30 dark:text-orange-400/10"
        fill="currentColor"
      >
        <path d="M0,120 L0,80 L30,80 L30,60 L60,60 L60,80 L90,80 L90,40 L100,40 L100,20 L110,20 L110,40 L120,40 L120,80 L160,80 L160,50 L190,50 L190,80 L230,80 L230,30 L240,30 L240,10 L250,10 L250,30 L260,30 L260,80 L310,80 L310,55 L340,55 L340,80 L390,80 L390,35 L400,35 L400,15 L410,15 L410,35 L420,35 L420,80 L470,80 L470,45 L500,45 L500,80 L560,80 L560,25 L575,25 L575,5 L590,5 L590,25 L605,25 L605,80 L660,80 L660,55 L690,55 L690,80 L740,80 L740,40 L755,40 L755,15 L770,15 L770,40 L785,40 L785,80 L840,80 L840,50 L870,50 L870,80 L920,80 L920,30 L935,30 L935,10 L950,10 L950,30 L965,30 L965,80 L1020,80 L1020,55 L1050,55 L1050,80 L1100,80 L1100,40 L1115,40 L1115,15 L1130,15 L1130,40 L1145,40 L1145,80 L1200,80 L1200,50 L1230,50 L1230,80 L1280,80 L1280,30 L1295,30 L1295,10 L1310,10 L1310,30 L1325,30 L1325,80 L1380,80 L1380,55 L1410,55 L1410,80 L1440,80 L1440,120 Z" />
      </svg>

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-orange-600 dark:text-orange-300 font-semibold text-xs uppercase tracking-widest">
              Explore India
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              Top Trending Destinations
            </h2>
          </div>

          <Button
            variant="link"
            className="text-sm font-medium text-gray-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-300 hidden sm:flex"
          >
            See All →
          </Button>
        </div>

        {/* Slider Section */}
        <div className="relative">

          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-5 top-[38%] -translate-y-1/2 z-20 bg-white dark:bg-slate-800 shadow-lg rounded-full p-3 hover:scale-105 transition"
          >
            <ChevronLeft className="w-5 h-5 dark:text-slate-100" />
          </button>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-2"
          >
            {trendingDestinations.map((item) => (
              <Card
                key={item.id}
                className="min-w-[280px] max-w-[280px] rounded-2xl border-0 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-900 overflow-hidden py-0 gap-0"
              >
                <div className="relative group overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <button className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-2 rounded-full shadow">
                    <Heart className="w-4 h-4 text-gray-700 dark:text-slate-200" />
                  </button>
                </div>

                <CardContent className="p-4">

                  <div className="flex items-center gap-1 text-gray-500 dark:text-slate-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 mt-1">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center text-orange-500">
                      <Star className="w-4 h-4 fill-orange-400 stroke-orange-400" />
                      <span className="ml-1 text-sm font-medium text-gray-800 dark:text-slate-200">
                        {item.rating}
                      </span>
                    </div>

                    <span className="text-sm text-gray-400 dark:text-slate-500">
                      ({item.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t dark:border-slate-700">
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-slate-400">
                      <Clock3 className="w-3 h-3" />
                      {item.duration}
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400 dark:text-slate-500">
                        Starting From
                      </p>

                      <p className="font-bold text-lg text-orange-500 dark:text-orange-400">
                        {item.price}
                      </p>
                    </div>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-5 top-[38%] -translate-y-1/2 z-20 bg-white dark:bg-slate-800 shadow-lg rounded-full p-3 hover:scale-105 transition"
          >
            <ChevronRight className="w-5 h-5 dark:text-slate-100" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default TopTrendingSection;