import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronLeft, ChevronRight, Compass } from "lucide-react";

/* ─────────────────────────────────────────────
   Skeleton Card
───────────────────────────────────────────── */
const ExperienceCardSkeleton = () => (
  <div className="flex-shrink-0 w-[200px] sm:w-[260px] lg:w-[290px] rounded-[22px] overflow-hidden bg-white/60 border border-orange-100 shadow-md">
    <Skeleton className="h-[170px] w-full rounded-none bg-orange-100/60" />
    <div className="p-4 space-y-2">
      <Skeleton className="h-3 w-16 rounded-full bg-orange-200/70" />
      <Skeleton className="h-3 w-24 rounded-full bg-gray-200" />
      <Skeleton className="h-5 w-36 rounded-full bg-gray-300" />
      <div className="flex items-center justify-between pt-4">
        <Skeleton className="h-11 w-11 rounded-full bg-orange-200" />
        <Skeleton className="h-3 w-20 rounded-full bg-gray-200" />
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Experience Card
───────────────────────────────────────────── */
const ExperienceCard = ({ item, index }) => (
  <Card
    key={index}
    style={{ animationDelay: `${index * 80}ms` }}
    className="
      flex-shrink-0
      w-[200px] sm:w-[260px] lg:w-[290px]
      rounded-[22px]
      border border-orange-100/60
      bg-white
      overflow-hidden
      shadow-md
      hover:shadow-2xl
      transition-all duration-500
      hover:-translate-y-2
      group
      animate-fade-in
      cursor-pointer
    "
  >
    {/* Image */}
    <div className="relative h-[170px] w-full overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      {/* Offer badge pinned top-left */}
      {item.offer && (
        <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-lg border-0">
          {item.offer}
        </Badge>
      )}
    </div>

    {/* Content */}
    <CardContent className="p-4 pb-5">
      <p className="text-gray-400 text-xs mt-0.5 truncate">{item.subtitle}</p>
      <h3 className="text-[17px] font-bold text-gray-900 mt-1 leading-snug line-clamp-2 group-hover:text-orange-500 transition-colors duration-300">
        {item.title}
      </h3>

      <div className="flex items-center justify-between mt-5">
        <button
          aria-label={`Explore ${item.title}`}
          className="
            w-11 h-11 rounded-full
            bg-orange-500 hover:bg-orange-600
            active:scale-95
            transition-all duration-300
            flex items-center justify-center
            text-white shadow-lg shadow-orange-200
            group-hover:shadow-orange-300
          "
        >
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
        <span className="text-xs text-gray-400 font-medium tracking-wide">Explore Now</span>
      </div>
    </CardContent>
  </Card>
);

/* ─────────────────────────────────────────────
   Scroll Dot Indicators
───────────────────────────────────────────── */
const ScrollDots = ({ total, active }) => (
  <div className="flex items-center gap-1.5 justify-center mt-6 lg:hidden">
    {Array.from({ length: Math.min(total, 6) }).map((_, i) => (
      <span
        key={i}
        className={`
          rounded-full transition-all duration-300
          ${i === active
            ? "w-5 h-2 bg-orange-500"
            : "w-2 h-2 bg-orange-200"}
        `}
      />
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const BestExperiences = ({ destination }) => {
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ── Business Logic (untouched) ──────────────
  const experiences = destination?.bestExperiences || [];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };
  // ────────────────────────────────────────────

  /* Simulate skeleton → content transition */
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  /* Track scroll position for arrows + dots */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      setCanScrollLeft(el.scrollLeft > 8);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);

      const cardWidth = el.scrollWidth / (experiences.length || 1);
      setActiveDot(Math.round(el.scrollLeft / cardWidth));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [experiences.length, isLoading]);

  const skeletonCount = 4;

  return (
    <section className="w-full bg-gradient-to-br from-[#fdf8f3] via-[#fef9f5] to-[#f8f2eb] py-14 overflow-hidden relative">

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-orange-100/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-16 w-56 h-56 rounded-full bg-amber-100/30 blur-2xl" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100">
                <Compass className="w-3.5 h-3.5 text-orange-500" />
              </span>
              <p className="text-orange-500 font-semibold text-xs uppercase tracking-[3px]">
                Explore Experiences
              </p>
            </div>

            <h2 className="text-3xl md:text-[2.6rem] font-extrabold text-gray-900 leading-tight tracking-tight">
              Best Travel{" "}
              <span className="relative inline-block">
                Experiences
                <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-gradient-to-r from-orange-400 to-amber-300 rounded-full" />
              </span>
            </h2>

            <p className="text-gray-500 mt-3 text-sm leading-relaxed max-w-lg">
              Discover curated destinations, luxury stays, scenic escapes, adventure
              tours, and unforgettable travel moments across India.
            </p>
          </div>

          {/* CTA + nav arrows (desktop) */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Prev / Next (desktop only) */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`
                  w-11 h-11 rounded-full border flex items-center justify-center
                  transition-all duration-300 shadow-sm
                  ${canScrollLeft
                    ? "bg-white border-gray-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-md text-gray-700"
                    : "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"}
                `}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`
                  w-11 h-11 rounded-full border flex items-center justify-center
                  transition-all duration-300 shadow-sm
                  ${canScrollRight
                    ? "bg-white border-gray-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-md text-gray-700"
                    : "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"}
                `}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Button className="rounded-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-6 h-11 text-sm font-semibold shadow-lg shadow-orange-200 transition-all duration-300">
              View All
            </Button>
          </div>
        </div>

        {/* ── Cards row ── */}
        <div className="relative">


          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-2 -mx-1 px-1"
          >
            {isLoading
              ? Array.from({ length: skeletonCount }).map((_, i) => (
                  <ExperienceCardSkeleton key={i} />
                ))
              : experiences.map((item, index) => (
                  <ExperienceCard key={index} item={item} index={index} />
                ))}
          </div>
        </div>

        {/* ── Mobile scroll dots ── */}
        {!isLoading && experiences.length > 0 && (
          <ScrollDots total={experiences.length} active={activeDot} />
        )}

        {/* ── Empty state ── */}
        {!isLoading && experiences.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
            <Compass className="w-10 h-10 text-orange-200" />
            <p className="text-sm font-medium">No experiences found for this destination.</p>
          </div>
        )}
      </div>

      {/* Global styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.45s ease both;
        }
      `}</style>
    </section>
  );
};

export default BestExperiences;