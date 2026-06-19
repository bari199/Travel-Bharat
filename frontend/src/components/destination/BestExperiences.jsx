import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
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
} from "lucide-react";

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
   Info Pill — tiny chip used on cards
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
      {/* ── Image ── */}
      <div className="relative h-[160px] w-full overflow-hidden shrink-0">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        {/* Offer badge */}
        {item.offer && (
          <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-lg border-0">
            {item.offer}
          </Badge>
        )}
      </div>

      {/* ── Content ── */}
      <CardContent className="p-4 pb-5 flex flex-col flex-1">
        {/* Subtitle */}
        {item.subtitle && (
          <p className="text-orange-500 text-[10px] font-semibold uppercase tracking-wider truncate">
            {item.subtitle}
          </p>
        )}

        {/* Title */}
        <h3 className="text-[16px] font-bold text-gray-900 leading-snug line-clamp-2 mt-1 group-hover:text-orange-500 transition-colors duration-300">
          {item.title}
        </h3>

        {/* Location row */}
        {(item.distance || item.location) && (
          <div className="flex items-center gap-1.5 mt-2.5 text-gray-500">
            <Navigation size={11} strokeWidth={2.5} className="text-orange-500 shrink-0" />
            <span className="text-[12px] truncate">{item.distance || item.location}</span>
          </div>
        )}

        {/* Best Time row */}
        {item.bestTime && (
          <div className="flex items-center gap-1.5 mt-1.5 text-gray-500">
            <CalendarDays size={11} strokeWidth={2.5} className="text-sky-500 shrink-0" />
            <span className="text-[12px] truncate">Best time: {item.bestTime}</span>
          </div>
        )}

        {/* Highlights row */}
        {highlightCount > 0 && (
          <div className="flex items-center gap-1.5 mt-1.5 text-gray-500">
            <Star size={11} strokeWidth={2.5} className="text-amber-500 shrink-0" />
            <span className="text-[12px] truncate">{highlightCount} Highlights</span>
          </div>
        )}

        {/* CTA row */}
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
   Detail Dialog
───────────────────────────────────────────── */
const ExperienceDialog = ({ experience, onClose }) => {
  if (!experience) return null;
  const highlights = Array.isArray(experience.highlights)
    ? experience.highlights
    : [];

  return (
    <Dialog open={!!experience} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-3xl border-0 shadow-2xl">
        <DialogClose className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md hover:bg-white transition-colors">
          <X className="w-4 h-4 text-gray-600" />
        </DialogClose>

        <ScrollArea className="max-h-[88vh]">
          {/* ── Hero ── */}
          <div className="relative h-[240px] md:h-[320px]">
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {/* Offer badge */}
            {experience.offer && (
              <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full border-0 shadow-lg">
                {experience.offer}
              </Badge>
            )}

            {/* Hero text */}
            <div className="absolute bottom-5 left-6 right-16 text-white">
              <p className="text-white/70 text-xs uppercase tracking-widest mb-1">
                {experience.subtitle}
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
                {experience.title}
              </h2>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="p-6 space-y-6 bg-white">

            {/* ── Quick Info Row ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Distance */}
              {experience.distance && (
                <div className="flex flex-col gap-1 bg-orange-50 rounded-2xl px-4 py-3 border border-orange-100">
                  <div className="flex items-center gap-1.5 text-orange-500">
                    <Navigation size={13} strokeWidth={2.5} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Distance
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 leading-tight">
                    {experience.distance}
                  </p>
                </div>
              )}

              {/* Location (falls back if no distance) */}
              {!experience.distance && experience.location && (
                <div className="flex flex-col gap-1 bg-orange-50 rounded-2xl px-4 py-3 border border-orange-100">
                  <div className="flex items-center gap-1.5 text-orange-500">
                    <MapPin size={13} strokeWidth={2.5} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Location 
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 leading-tight">
                    {experience.location}
                  </p>
                </div>
              )}

              {/* Best Time */}
              {experience.bestTime && (
                <div className="flex flex-col gap-1 bg-sky-50 rounded-2xl px-4 py-3 border border-sky-100">
                  <div className="flex items-center gap-1.5 text-sky-500">
                    <CalendarDays size={13} strokeWidth={2.5} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Best Time
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 leading-tight">
                    {experience.bestTime}
                  </p>
                </div>
              )}

              {/* Duration / extra meta */}
              {experience.duration && (
                <div className="flex flex-col gap-1 bg-violet-50 rounded-2xl px-4 py-3 border border-violet-100">
                  <div className="flex items-center gap-1.5 text-violet-500">
                    <Clock size={13} strokeWidth={2.5} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Duration
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 leading-tight">
                    {experience.duration}
                  </p>
                </div>
              )}
            </div>

            <Separator className="bg-slate-100" />

            {/* ── Description ── */}
            {experience.description && (
              <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
                  About
                </h3>
                <p className="text-gray-600 text-sm leading-7">
                  {experience.description}
                </p>
              </div>
            )}

            {/* ── Highlights ── */}
            {highlights.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100/60"
                    >
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                        <Star size={10} className="text-orange-500" fill="currentColor" />
                      </span>
                      <span className="text-[13px] text-slate-700 leading-5">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── CTA ── */}
            <div className="pt-2">
              <Button className="w-full rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white h-12 text-sm font-bold shadow-lg shadow-orange-200 transition-all duration-300 flex items-center gap-2">
                Book This Experience
                <ArrowRight size={15} />
              </Button>
            </div>
          </div>
        </ScrollArea>
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

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

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
            {/* Eyebrow */}
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

            {/* Meta pills */}
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

        {/* Scroll dots */}
        {!isLoading && experiences.length > 0 && (
          <ScrollDots total={experiences.length} active={activeDot} />
        )}

        {/* Empty state */}
        {!isLoading && experiences.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
            <Compass className="w-10 h-10 text-orange-200" />
            <p className="text-sm font-medium">
              No experiences found for this destination.
            </p>
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
        .animate-fade-in { animation: fade-in 0.45s ease both; }
      `}</style>

      {/* ── Detail Dialog ── */}
      <ExperienceDialog
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </section>
  );
};

export default BestExperiences;