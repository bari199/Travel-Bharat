import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  MapPin,
  Star,
  Clock,
  X,
  CalendarDays,
  Navigation,
  Tag,
  Gauge,
} from "lucide-react";

import { getExperiencesByDestination } from "@/services/Experienceapi.js";

/* ─────────────────────────────────────────────
   Skeleton Card
───────────────────────────────────────────── */
const ExperienceCardSkeleton = () => (
  <div className="flex-shrink-0 w-[220px] sm:w-[270px] lg:w-[300px] rounded-[22px] overflow-hidden bg-white/60 border border-orange-100 shadow-md">
    <Skeleton className="h-[170px] w-full rounded-none bg-orange-100/60" />
    <div className="p-4 space-y-2">
      <Skeleton className="h-3 w-16 rounded-full bg-orange-200/70" />
      <Skeleton className="h-5 w-36 rounded-full bg-gray-300" />
      <Skeleton className="h-3 w-24 rounded-full bg-gray-200" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-5 w-20 rounded-full bg-orange-100" />
        <Skeleton className="h-5 w-16 rounded-full bg-blue-100" />
      </div>
      <div className="flex items-center justify-between pt-3">
        <Skeleton className="h-10 w-10 rounded-full bg-orange-200" />
        <Skeleton className="h-3 w-20 rounded-full bg-gray-200" />
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Info Pill
───────────────────────────────────────────── */
const InfoPill = ({ icon: Icon, label, colorClass }) => (
  <span
    className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${colorClass}`}
  >
    <Icon size={9} strokeWidth={2.5} className="shrink-0" />
    <span className="truncate max-w-[110px]">{label}</span>
  </span>
);

/* ─────────────────────────────────────────────
   Experience Card
───────────────────────────────────────────── */
const ExperienceCard = ({ item, index, onClick }) => {
  const highlightCount = Array.isArray(item.highlights)
    ? item.highlights.length
    : typeof item.highlights === "number"
      ? item.highlights
      : 0;

  return (
    <Card
      onClick={onClick}
      style={{ animationDelay: `${index * 80}ms` }}
      className="
        flex-shrink-0
        w-[220px] sm:w-[270px] lg:w-[300px]
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
        flex flex-col
      "
    >
      <div className="relative h-[160px] w-full overflow-hidden shrink-0">
        {item.images?.[0] ?.url ? (
          <img
            src={item.images[0].url}
            alt={item.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-orange-50">
            <Compass className="w-10 h-10 text-orange-200" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        {"Price: ₹ " + item.priceRange && (
          <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-lg border-0">
            {"Price: ₹ " + item.priceRange}
          </Badge>
        )}
      </div>

      <CardContent className="p-4 pb-5 flex flex-col flex-1">
        {item.subtitle && (
          <p className="text-orange-500 text-[10px] font-semibold uppercase tracking-wider truncate">
            {item.subtitle}
          </p>
        )}
        <h3 className="text-[16px] font-bold text-gray-900 leading-snug line-clamp-2 mt-1 group-hover:text-orange-500 transition-colors duration-300">
          {item.title}
        </h3>
        {(item.category || item.difficultyLevel) && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {item.category && (
              <InfoPill
                icon={Tag}
                label={item.category}
                colorClass="bg-emerald-50 text-emerald-600"
              />
            )}
            {item.difficultyLevel && (
              <InfoPill
                icon={Gauge}
                label={item.difficultyLevel}
                colorClass="bg-rose-50 text-rose-600"
              />
            )}
          </div>
        )}
        {(item.distance || item.location) && (
          <div className="flex items-center gap-1.5 mt-2.5 text-gray-500">
            <Navigation
              size={11}
              strokeWidth={2.5}
              className="text-orange-500 shrink-0"
            />
            <span className="text-[12px] truncate">
              {item.distance || item.location}
            </span>
          </div>
        )}
        {item.bestTime && (
          <div className="flex items-center gap-1.5 mt-1.5 text-gray-500">
            <CalendarDays
              size={11}
              strokeWidth={2.5}
              className="text-sky-500 shrink-0"
            />
            <span className="text-[12px] truncate">
              Best time: {item.bestTime}
            </span>
          </div>
        )}
        {highlightCount > 0 && (
          <div className="flex items-center gap-1.5 mt-1.5 text-gray-500">
            <Star
              size={11}
              strokeWidth={2.5}
              className="text-amber-500 shrink-0"
            />
            <span className="text-[12px] truncate">
              {highlightCount} Highlights
            </span>
          </div>
        )}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <button
            aria-label={`Explore ${item.title}`}
            className="
              w-10 h-10 rounded-full
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
          <span className="text-[11px] text-gray-400 font-semibold tracking-wide uppercase">
            Explore Now
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

/* ─────────────────────────────────────────────
   Scroll Dot Indicators
───────────────────────────────────────────── */
const ScrollDots = ({ total, active }) => (
  <div className="flex items-center gap-1.5 justify-center mt-6 lg:hidden">
    {Array.from({ length: Math.min(total, 6) }).map((_, i) => (
      <span
        key={i}
        className={`rounded-full transition-all duration-300 ${
          i === active ? "w-5 h-2 bg-orange-500" : "w-2 h-2 bg-orange-200"
        }`}
      />
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   Detail Dialog  ← REDESIGNED (forced full-width)
───────────────────────────────────────────── */
const ExperienceDialog = ({ experience, onClose }) => {
  if (!experience) return null;
  const highlights = Array.isArray(experience.highlights)
    ? experience.highlights
    : [];

  const facts = [
    {
      key: "distance",
      label: "Distance",
      value: experience.distance,
      icon: Navigation,
      ring: "ring-orange-200",
      iconBg: "bg-orange-500",
    },
    {
      key: "bestTime",
      label: "Best Time",
      value: experience.bestTime,
      icon: CalendarDays,
      ring: "ring-sky-200",
      iconBg: "bg-sky-500",
    },
    {
      key: "duration",
      label: "Duration",
      value: experience.duration,
      icon: Clock,
      ring: "ring-indigo-200",
      iconBg: "bg-indigo-500",
    },
    {
      key: "difficulty",
      label: "Difficulty",
      value: experience.difficultyLevel,
      icon: Gauge,
      ring: "ring-rose-200",
      iconBg: "bg-rose-500",
    },
    {
      key: "category",
      label: "Category",
      value: experience.category,
      icon: Tag,
      ring: "ring-emerald-200",
      iconBg: "bg-emerald-500",
    },
    {
      key: "location",
      label: "Location",
      value: !experience.distance ? experience.location : null,
      icon: MapPin,
      ring: "ring-amber-200",
      iconBg: "bg-amber-500",
    },
  ].filter((f) => f.value);

  return (
    <Dialog open={!!experience} onOpenChange={onClose}>
      <DialogContent
        hideCloseButton
        // ⚠️ Inline style wins over ANY default className (e.g. shadcn's
        // built-in `max-w-lg`) regardless of class merge order. This is
        // the part that guarantees the dialog actually renders full width.
        style={{
          width: "96vw",
          maxWidth: "1440px",
          height: "92vh",
          maxHeight: "920px",
        }}
        className="
          !w-[96vw]
          !max-w-[1440px]
          !h-[92vh]
          !max-h-[920px]
          p-0
          gap-0
          overflow-hidden
          bg-white
          rounded-[28px]
          border-0
          shadow-2xl
        "
      >
        <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden">
          {/* ── Left: Visual / Identity Panel ── */}
          <div className="relative w-full lg:w-[42%] shrink-0 h-[220px] lg:h-full overflow-hidden">
            {experience.images?.[0]? (
              <img
                src={experience.images?.[0]?.url}
                alt={experience.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-orange-50">
                <Compass className="w-16 h-16 text-orange-200" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5 lg:bg-gradient-to-tr lg:from-black/90 lg:via-black/35 lg:to-transparent" />

            {experience.priceRange && (
              <Badge className="absolute top-6 left-6 bg-orange-500 hover:bg-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg border-0 z-10">
                {experience.priceRange}
              </Badge>
            )}

            <DialogClose asChild>
              <button
                aria-label="Close"
                className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-colors flex items-center justify-center text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </DialogClose>

            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-9 z-10">
              {experience.subtitle && (
                <p className="text-orange-300 text-[11px] font-bold uppercase tracking-[3px] mb-2">
                  {experience.subtitle}
                </p>
              )}
              <h2 className="text-2xl lg:text-[2.3rem] font-extrabold text-white leading-[1.08] tracking-tight drop-shadow-sm">
                {experience.title}
              </h2>

              {highlights.length > 0 && (
                <div className="flex items-center gap-1.5 mt-4 text-amber-300">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-semibold text-white/90">
                    {highlights.length} curated highlights
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: Content Panel ── */}
          <div className="relative flex-1 min-w-0 h-full overflow-hidden">
            <ScrollArea className="h-full w-full">
              <div className="px-6 sm:px-10 lg:px-14 py-8 lg:py-10 space-y-10">
                {/* Quick facts */}
                {facts.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {facts.map((f) => (
                      <div
                        key={f.key}
                        className={`rounded-2xl bg-[#fdf8f3] ring-1 ${f.ring} px-3.5 py-3.5 flex flex-col gap-2`}
                      >
                        <span
                          className={`w-7 h-7 rounded-full ${f.iconBg} flex items-center justify-center shadow-sm`}
                        >
                          <f.icon
                            size={13}
                            strokeWidth={2.5}
                            className="text-white"
                          />
                        </span>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            {f.label}
                          </p>
                          <p className="text-[13.5px] font-bold text-slate-800 leading-tight mt-0.5">
                            {f.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* About */}
                {experience.description && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="h-px w-8 bg-orange-300" />
                      <h3 className="text-[11px] font-bold uppercase tracking-[3px] text-orange-500">
                        About this experience
                      </h3>
                    </div>
                    <p className="text-gray-600 text-[15px] leading-8 max-w-[760px]">
                      {experience.description}
                    </p>
                  </div>
                )}

                {/* Highlights */}
                {highlights.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="h-px w-8 bg-orange-300" />
                      <h3 className="text-[11px] font-bold uppercase tracking-[3px] text-orange-500">
                        Highlights
                      </h3>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {highlights.map((item, index) => (
                        <div
                          key={index}
                          className="
                            flex items-start gap-3
                            px-4 py-3.5
                            rounded-2xl
                            bg-white
                            ring-1 ring-orange-100
                            shadow-sm
                            hover:shadow-md hover:ring-orange-200
                            transition-all duration-300
                          "
                        >
                          <span className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-orange-200">
                            <Star
                              size={11}
                              fill="currentColor"
                              className="text-white"
                            />
                          </span>
                          <span className="text-[13.5px] text-slate-700 leading-snug pt-0.5">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA footer */}
                <div className="pt-2">
                  <Separator className="mb-6 bg-orange-100" />
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <p className="text-sm text-gray-500 max-w-xs">
                      Ready to add this to your itinerary?
                    </p>
                    <Button className="rounded-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-7 h-12 text-sm font-semibold shadow-lg shadow-orange-200 transition-all duration-300 flex items-center gap-2">
                      Plan This Experience <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const BestExperiences = ({ destination }) => {
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [experiences, setExperiences] = useState([]);

  const destinationId = destination?._id;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  /* ── Fetch real experiences for this destination ── */
  useEffect(() => {
    if (!destinationId) {
      setExperiences([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const fetchExperiences = async () => {
      try {
        setIsLoading(true);

        const res = await getExperiencesByDestination(destinationId);

        console.log("Experience Response:", res);
        console.log(res);
        console.log(res.experiences);

        if (!cancelled) {
          setExperiences(res.experiences || []);
        }
      } catch (error) {
        console.error("Failed to load best experiences", error);

        if (!cancelled) {
          setExperiences([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchExperiences();

    return () => {
      cancelled = true;
    };
  }, [destinationId]);

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
    <section className="w-full bg-[#fdf8f3] py-14 overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-orange-100/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-16 w-56 h-56 rounded-full bg-amber-100/30 blur-2xl" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100">
                <Compass className="w-3.5 h-3.5 text-orange-500" />
              </span>
              <p className="text-orange-500 font-bold text-[11px] uppercase tracking-[3px]">
                Explore Experiences
              </p>
            </div>

            <h2 className="text-3xl md:text-[2.5rem] font-extrabold text-gray-900 leading-tight tracking-tight">
              Best Travel{" "}
              <span className="relative inline-block">
                Experiences
                <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-gradient-to-r from-orange-400 to-amber-300 rounded-full" />
              </span>
            </h2>

            <p className="text-gray-500 mt-4 text-sm leading-relaxed max-w-lg">
              Discover curated destinations, luxury stays, scenic escapes,
              adventure tours, and unforgettable travel moments across India.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="inline-flex items-center gap-1.5 bg-white border border-orange-100 text-orange-600 text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                <Navigation size={10} /> Top Locations
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-sky-100 text-sky-600 text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                <CalendarDays size={10} /> Best Time Picks
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-amber-100 text-amber-600 text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                <Star size={10} /> Highlights
              </span>
            </div>
          </div>

          {/* Nav + CTA */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-2">
              {[
                { dir: "left", icon: ChevronLeft, can: canScrollLeft },
                { dir: "right", icon: ChevronRight, can: canScrollRight },
              ].map(({ dir, icon: Icon, can }) => (
                <button
                  key={dir}
                  onClick={() => scroll(dir)}
                  disabled={!can}
                  aria-label={`Scroll ${dir}`}
                  className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 shadow-sm ${
                    can
                      ? "bg-white border-gray-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-md text-gray-700"
                      : "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            <Button className="rounded-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-6 h-11 text-sm font-semibold shadow-lg shadow-orange-200 transition-all duration-300 flex items-center gap-2">
              View All <ArrowRight size={14} />
            </Button>
          </div>
        </div>

        {/* ── Cards Row ── */}
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
                  <ExperienceCard
                    key={index}
                    item={item}
                    index={index}
                    onClick={() => setSelectedExperience(item)}
                  />
                ))}
          </div>
        </div>

        {!isLoading && experiences.length > 0 && (
          <ScrollDots total={experiences.length} active={activeDot} />
        )}

        {!isLoading && experiences.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
            <Compass className="w-10 h-10 text-orange-200" />
            <p className="text-sm font-medium">
              No experiences found for this destination.
            </p>
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.45s ease both; }
      `}</style>

      <ExperienceDialog
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </section>
  );
};

export default BestExperiences;
