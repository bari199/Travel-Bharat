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
    <section className="w-full bg-white py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 md:px-5">
        <div className="flex flex-col items-center">

          {user && (
            <h1 className="font-bold text-2xl mb-4 text-center">
              Welcome {user.username}
            </h1>
          )}

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
                  <div className="relative overflow-hidden rounded-3xl h-[400px] md:h-[450px]">

                    <img
                      src={item.image}
                      alt={item.title}
                      draggable="false"
                      className="w-full h-full object-cover select-none"
                    />

                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-white px-4 text-center">

                        <h1 className="text-2xl md:text-4xl font-bold">
                          {item.title}
                        </h1>

                        <p className="mt-2 text-sm md:text-base">
                          Discover your next adventure
                        </p>

                        <button
                          onClick={() => navigate("/destination")}
                          className="mt-4 bg-orange-500 hover:bg-orange-600 transition-all duration-300 px-5 py-2 rounded-full"
                        >
                          Explore Now
                        </button>

                      </div>
                    </div>

                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2 z-20" />
            <CarouselNext className="right-3 top-1/2 -translate-y-1/2 z-20" />
          </Carousel>

          {/* <SearchBox /> */}

        </div>
      </div>
    </section>
  );
};

export default Hero;