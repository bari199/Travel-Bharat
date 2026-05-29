import React, { useRef } from "react";
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
import { trendingDestinations } from "../data/data";


const TopTrendingSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;

      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-[#f5dac4] py-16 px-4 md:px-8 ">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
              Explore India
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Top Trending Destinations
            </h2>
          </div>

          <Button
            variant="ghost"
            className="text-sm font-medium hidden sm:flex"
          >
            See All →
          </Button>
        </div>

        {/* Slider Section */}
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 hover:scale-105 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-2"
          >
            {trendingDestinations.map((item) => (
              <Card
                key={item.id}
                className="min-w-[280px] max-w-[280px] rounded-3xl border-0 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white overflow-hidden"
              >
                {/* Image */}
                <div className="relative group overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-35 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow">
                    <Heart className="w-4 h-4 text-gray-700" />
                  </button>
                </div>

                <CardContent className="p-2">
                  {/* Location */}
                  <div className="flex items-center gap-1 text-gray-500 text-sm ">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center text-orange-500">
                      <Star className="w-4 h-4 fill-orange-400 stroke-orange-400" />
                      <span className="ml-1 text-sm font-medium text-gray-800">
                        {item.rating}
                      </span>
                    </div>

                    <span className="text-sm text-gray-400">
                      ({item.reviews} reviews)
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock3 className="w-3 h-3" />
                      {item.duration}
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400">Starting From</p>
                      <p className="font-bold text-lg text-orange-500">
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
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 hover:scale-105 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hide Scrollbar */}
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
}

export default TopTrendingSection