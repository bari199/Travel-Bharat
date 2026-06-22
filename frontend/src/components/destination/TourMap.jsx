import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  CalendarDays,
  Star,
  ExternalLink,
  Clock,
  ChevronRight,
  Compass,
  ImageIcon,
  Map,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

/* ─── Framer Motion Variants ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const tabFade = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

/* ─── Main Component ─────────────────────────────────────────── */
const TourMap = ({ destination }) => {
  const attractions = destination?.nearbyAttractions || [];
  const placeImages  = destination?.placeImages    || [];
  const [activeView, setActiveView] = useState("map");

  return (
    <section className="w-full bg-[#f8fafc] py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-orange-100/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-16 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10 sm:mb-14"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 shadow-sm shadow-orange-200">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[3px] text-orange-600">
              Travel Route Guide
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-3"
          >
            Explore the Area Around
            <br className="hidden sm:block" />
            <span className="relative inline-block text-orange-500">
              {" "}{destination?.name}
              <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-gradient-to-r from-orange-400 to-amber-300 rounded-full" />
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-slate-500 text-sm sm:text-base max-w-xl leading-relaxed"
          >
            Discover local viewpoints, hidden gems, and unforgettable
            experiences all within reach of your destination.
          </motion.p>
        </motion.div>

        {/* ── Map / Gallery Toggle ────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-10 sm:mb-14"
        >
          {/* Toggle pills */}
          <div className="inline-flex items-center gap-1.5 mb-5 p-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            {[
              { id: "map",     label: "Map View",  Icon: Map       },
              { id: "gallery", label: "Gallery",   Icon: ImageIcon },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveView(id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                  ${activeView === id
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-200"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="relative w-full rounded-[26px] overflow-hidden border border-slate-200 shadow-lg shadow-slate-200/50 bg-white">
            <AnimatePresence mode="wait">
              {activeView === "map" ? (
                <motion.div
                  key="map"
                  variants={tabFade}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="w-full h-[300px] sm:h-[420px] lg:h-[500px]"
                >
                  <iframe
                    title={destination?.name}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      destination?.location || ""
                    )}&output=embed`}
                    style={{ width: "100%", height: "100%", border: 0, display: "block" }}
                    loading="lazy"
                  />
                  {destination?.location && (
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3.5 py-2.5 shadow-lg border border-slate-100 flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 shrink-0">
                        <MapPin className="w-3 h-3 text-white" />
                      </span>
                      <span className="text-xs font-bold text-slate-700 max-w-[160px] truncate">
                        {destination.location}
                      </span>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="gallery"
                  variants={tabFade}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="w-full h-[300px] sm:h-[420px] lg:h-[500px]"
                >
                  <GalleryMosaic placeImages={placeImages} destination={destination} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Nearby Attractions ──────────────────────────────── */}
        {attractions.length > 0 && (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Sub-header */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-sky-500 shadow-sm shadow-blue-200">
                    <Navigation className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[3px] text-blue-600">
                    Points of Interest
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Nearby Attractions
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  {attractions.length} places worth visiting nearby
                </p>
              </div>

              <Badge
                variant="outline"
                className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border-slate-200 rounded-full px-3.5 py-2 shrink-0 shadow-sm"
              >
                <MapPin className="w-3 h-3 text-orange-500" />
                Around {destination?.name}
              </Badge>
            </motion.div>

            <Separator className="mb-6 bg-slate-200" />

            {/* Horizontal card scroll */}
            <ScrollArea className="w-full overflow-x-auto">
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.05 }}
                className="flex gap-4 pb-5 w-max"
              >
                {attractions.map((place, i) => (
                  <AttractionCard key={i} place={place} index={i} />
                ))}
              </motion.div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </motion.div>
        )}

        {/* Empty state */}
        {attractions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 rounded-[26px] border border-dashed border-slate-300 bg-white">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-3">
              <MapPin className="w-6 h-6 text-slate-300" />
            </span>
            <p className="text-sm text-slate-400 font-medium">No nearby attractions available yet.</p>
          </div>
        )}

      </div>
    </section>
  );
};

/* ─── Gallery Mosaic ─────────────────────────────────────────── */
const GalleryMosaic = ({ placeImages, destination }) => {
  if (!placeImages.length) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 gap-3">
        <span className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm">
          <ImageIcon className="w-7 h-7 text-slate-300" />
        </span>
        <p className="text-sm text-slate-400 font-medium">No photos available</p>
      </div>
    );
  }

  const [img1, img2, img3] = placeImages;

  return (
    <div className="flex w-full h-full gap-2 p-2">
      {/* Left — big */}
      <div className="relative flex-1 overflow-hidden rounded-2xl group">
        <img
          src={img1}
          alt={destination?.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 text-white text-xs font-bold
                         bg-black/45 backdrop-blur-md rounded-full px-3 py-1.5 shadow-sm">
          <MapPin className="w-3 h-3 text-orange-300" />
          {destination?.name}
        </span>
      </div>

      {/* Right — stacked two */}
      {(img2 || img3) && (
        <div className="flex flex-col gap-2" style={{ flex: "0 0 38%" }}>
          {img2 && (
            <div className="relative flex-1 overflow-hidden rounded-2xl group">
              <img
                src={img2}
                alt={destination?.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          )}
          {img3 && (
            <div className="relative flex-1 overflow-hidden rounded-2xl group">
              <img
                src={img3}
                alt={destination?.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {placeImages.length > 3 && (
                <div className="absolute inset-0 flex items-center justify-center
                                bg-black/55 rounded-2xl backdrop-blur-sm">
                  <span className="text-white text-base font-bold">
                    +{placeImages.length - 3}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ─── Attraction Card ────────────────────────────────────────── */
const AttractionCard = ({ place, index }) => (
  <motion.div
    variants={fadeUp}
    custom={index}
    whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
    className="group shrink-0 w-[260px] sm:w-[290px] flex flex-col bg-white border border-slate-100
               rounded-[22px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
  >
    {/* Image */}
    <div className="relative h-40 shrink-0 overflow-hidden bg-slate-100">
      {place?.image ? (
        <img
          src={place.image}
          alt={place.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <MapPin className="w-8 h-8 text-slate-300" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

      {/* Title on image */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5">
        <h4 className="text-white text-[15px] font-bold leading-snug line-clamp-1 drop-shadow-sm">
          {place?.title}
        </h4>
      </div>
    </div>

    {/* Body */}
    <div className="flex flex-col flex-1 p-4 gap-3">

      {/* Distance + Best time */}
      {(place?.distance || place?.bestTime) && (
        <div className="flex flex-wrap gap-1.5">
          {place?.distance && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-600 bg-orange-50 rounded-full px-2.5 py-1">
              <Navigation className="w-3 h-3 shrink-0" />
              {place.distance}
            </span>
          )}
          {place?.bestTime && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-sky-600 bg-sky-50 rounded-full px-2.5 py-1">
              <Clock className="w-3 h-3 shrink-0" />
              {place.bestTime}
            </span>
          )}
        </div>
      )}

      {/* Description */}
      {place?.description && (
        <p className="text-[12.5px] text-slate-500 leading-[1.6] line-clamp-2">
          {place.description}
        </p>
      )}

      {/* Highlights */}
      {place?.highlights?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {place.highlights.slice(0, 3).map((h, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-[10.5px] font-semibold
                         bg-amber-50 text-amber-700 ring-1 ring-amber-100
                         rounded-full px-2.5 py-1"
            >
              <Star className="w-2.5 h-2.5 shrink-0 text-amber-500" fill="currentColor" />
              {h}
            </span>
          ))}
        </div>
      )}

      {/* Maps link — pinned to bottom */}
      {place?.mapLink && (
        <div className="mt-auto pt-3 border-t border-slate-100">
          <a
            href={place.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold w-full justify-center
                       text-white bg-slate-900 hover:bg-orange-500 transition-colors duration-300
                       rounded-full px-3 py-2.5 group/link"
          >
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            Open in Google Maps
            <ExternalLink className="w-3 h-3 opacity-70 group-hover/link:translate-x-0.5 transition-transform" />
          </a>
        </div>
      )}
    </div>
  </motion.div>
);

export default TourMap;