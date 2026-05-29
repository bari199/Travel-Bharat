import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const BestExperiences = () => {
  const scrollRef = useRef(null);

  const experiences = [
    {
      id: 1,
      title: "Indian Destination",
      offer: "Grab up to 35% off",
      subtitle: "on your favorite",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Mountain Escape",
      offer: "Save up to 40%",
      subtitle: "for weekend trips",
      image:
        "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Beach Paradise",
      offer: "Exclusive 25% Deal",
      subtitle: "on beach resorts",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Kerala Backwaters",
      offer: "Luxury stay from ₹4999",
      subtitle: "limited period offer",
      image:
        "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Ladakh Adventure",
      offer: "Adventure deals 50% off",
      subtitle: "for bike expeditions",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  // Scroll Function
  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 320;

      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-[#f8f5f2] py-10 overflow-hidden">
      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto px-2 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          {/* Left Content */}
          <div className="max-w-2xl">
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-[3px]">
              Explore Experiences
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 leading-tight">
              Best Travel Experiences
            </h2>

            <p className="text-gray-500 mt-2 text-sm md:text-base leading-5">
              Discover curated destinations, luxury stays, scenic escapes,
              adventure tours, and unforgettable travel moments across India.
            </p>
          </div>

          {/* View All Button */}
          <div>
            <Button className="rounded-full bg-black hover:bg-orange-500 text-white px-6 h-12 text-sm font-medium">
              View All
            </Button>
          </div>
        </div>

        {/* Slider Section */}
        <div className="relative w-full">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="
              hidden lg:flex
              absolute
              left-0
              top-1/2
              -translate-y-1/2
              -translate-x-1/2
              z-20
              w-12
              h-12
              rounded-full
              bg-white
              border
              border-gray-200
              shadow-lg
              hover:bg-orange-500
              hover:text-white
              transition-all
              duration-300
              items-center
              justify-center
            "
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="
              hidden lg:flex
              absolute
              right-0
              top-1/2
              -translate-y-1/2
              translate-x-1/2
              z-20
              w-12
              h-12
              rounded-full
              bg-white
              border
              border-gray-200
              shadow-lg
              hover:bg-orange-500
              hover:text-white
              transition-all
              duration-300
              items-center
              justify-center
            "
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Wrapper */}
          <div
            ref={scrollRef}
            className="
              flex
              gap-3
              overflow-x-auto
              scroll-smooth
              no-scrollbar
              px-1
            "
          >
            {experiences.map((item) => (
              <Card
                key={item.id}
                className="
                  flex-shrink-0
                  w-[200px]
                  sm:w-[260px]
                  md:w-[240px]
                  lg:w-[290px]
                  rounded-[20px]
                  border-0
                  bg-[#f6f1eb]
                  overflow-hidden
                  shadow-md
                  hover:shadow-2xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  py-1
                  group
                "
              >
                {/* Image */}
                <div className="relative h-[170px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Content */}
                <CardContent className="p-4">
                  {/* Offer */}
                  <p className="text-orange-500 text-sm font-semibold leading-3">
                    {item.offer}
                  </p>

                  {/* Subtitle */}
                  <p className="text-gray-500 text-sm mt-1">
                    {item.subtitle}
                  </p>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mt-1 leading-snug">
                    {item.title}
                  </h3>

                  {/* Bottom */}
                  <div className="flex items-center justify-between mt-6">
                    <button className="w-11 h-11 rounded-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 flex items-center justify-center text-white shadow-lg">
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <span className="text-sm text-gray-400 font-medium">
                      Explore Now
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
};

export default BestExperiences;