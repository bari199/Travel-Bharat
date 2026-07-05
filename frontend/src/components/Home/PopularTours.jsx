import React, { memo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  Heart,
  MapPin,
  Clock3,
  Star,
} from "lucide-react";

import { tours } from "../../data/data";

/**
 * Light, GPU-friendly variants — only opacity/transform animated.
 */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

/**
 * Single tour card, memoized so re-renders elsewhere
 * (e.g. another card's heart toggle) never touch siblings.
 */
const TourCard = memo(function TourCard({ tour }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <motion.div variants={cardVariants}>
      <Card className="rounded-2xl border border-slate-200 shadow-none hover:shadow-md transition-shadow duration-300 overflow-hidden h-full">
        <CardContent className="px-2 pt-0">
          {/* Image */}
          <div className="relative w-full h-40 sm:h-44 md:h-45 rounded-xl overflow-hidden bg-slate-100">
            {!imgLoaded && (
              <span className="absolute inset-0 animate-pulse bg-slate-200" />
            )}

            <img
              src={tour.image}
              alt={tour.title}
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover rounded-xl transition-opacity duration-300 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
            />

            <motion.button
              type="button"
              onClick={() => setLiked((prev) => !prev)}
              whileTap={{ scale: 0.85 }}
              transition={{ type: "tween", duration: 0.15 }}
              aria-label="Save tour"
              className="absolute bottom-3 right-3 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
            >
              <Heart
                className={`w-4 h-4 transition-colors duration-200 ${
                  liked ? "fill-red-500 stroke-red-500" : "text-slate-600"
                }`}
              />
            </motion.button>
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

            <span className="text-sm text-slate-500">{tour.reviews}</span>
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
    </motion.div>
  );
});

const PopularTours = () => {
  return (
    <section className="w-full py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Find Popular Tours
          </h2>

          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "tween", duration: 0.15 }}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-black transition-colors"
          >
            See all
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {tours.map((tour, index) => (
            <TourCard key={tour.id ?? index} tour={tour} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(PopularTours);