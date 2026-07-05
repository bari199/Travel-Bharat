import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

import SearchBox from "./SearchBox";
import { getData } from "@/context/userContext";
import { carouselImages } from "../../data/data";

import HeroSkeleton from "../Skeletons/HeroSkeleton";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Hero = () => {
  const { user } = getData();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <HeroSkeleton />;
  }

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-orange-50 via-white to-white py-6 md:py-10">

      {/* Decorative background layer behind the carousel */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        {/* soft color blobs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="absolute top-10 -right-20 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-sky-300/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-amber-200/30 blur-3xl" />

        {/* faint dotted grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            color: "#ea580c",
          }}
        />

        {/* thin orbiting ring accents */}
        <div className="hidden sm:block absolute top-8 right-10 w-20 h-20 rounded-full border border-orange-300/50" />
        <div className="hidden sm:block absolute bottom-12 left-8 w-14 h-14 rounded-full border border-sky-300/50" />

        {/* compass / sparkle accent */}
        <svg
          className="hidden md:block absolute top-6 left-[8%] w-8 h-8 text-orange-400/60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
          <circle cx="12" cy="12" r="6" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
        <div className="flex flex-col items-center">
          <Carousel
            opts={{
              loop: true,
              align: "start",
              skipSnaps: false,
              dragFree: false,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="relative w-full max-w-5xl"
          >
            <CarouselContent>
              {carouselImages.map((item) => (
                <CarouselItem key={item.id}>
                  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl h-[280px] xs:h-[320px] sm:h-[380px] md:h-[450px] lg:h-[500px] shadow-xl">

                    <img
                      src={item.image}
                      alt={item.title}
                      draggable="false"
                      className="w-full h-full object-cover select-none scale-105"
                    />

                    {/* Gradient overlay instead of flat black, reads better and looks richer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white px-4 sm:px-6 text-center max-w-2xl">

                        <span className="inline-block text-orange-300 font-semibold text-[11px] sm:text-xs uppercase tracking-[0.2em] mb-2 sm:mb-3 drop-shadow">
                          Explore India
                        </span>

                        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold leading-tight drop-shadow-md">
                          {item.title}
                        </h1>

                        <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-white/90">
                          Discover your next adventure
                        </p>

                        <button
                          onClick={() => navigate("/destination")}
                          className="mt-4 sm:mt-6 bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all duration-300 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium shadow-lg shadow-orange-900/30"
                        >
                          Explore Now
                        </button>

                      </div>
                    </div>

                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-10 sm:w-10 bg-white/90 hover:bg-white border-0 shadow-lg" />
            <CarouselNext className="right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-10 sm:w-10 bg-white/90 hover:bg-white border-0 shadow-lg" />
          </Carousel>

          {/* <SearchBox /> */}

        </div>
      </div>
    </section>
  );
};

export default Hero;