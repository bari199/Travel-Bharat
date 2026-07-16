import React, { memo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "../../data/data";

/**
 * Light, GPU-friendly variants.
 * - No layout-affecting properties (only opacity/transform) -> no reflow jank.
 * - Stagger is small and capped so long lists don't feel slow.
 */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

/**
 * Single destination card.
 * Memoized so re-renders of the parent (e.g. dot state changes)
 * never re-render every card.
 */
const DestinationCard = memo(function DestinationCard({ item }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center text-center group cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
        className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-md bg-slate-100 dark:bg-slate-800"
      >
        {/* Lightweight shimmer placeholder until the image paints */}
        {!loaded && (
          <span className="absolute inset-0 animate-pulse bg-slate-200 dark:bg-slate-700" />
        )}

        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </motion.div>

      <div className="mt-3 sm:mt-4">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 dark:text-white">
          {item.name}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {item.tours}
        </p>
      </div>
    </motion.div>
  );
});

const TrendingDestinations = () => {
  return (
    <section className="w-full bg-white dark:bg-slate-950 py-12 sm:py-16 md:py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            <span className="text-orange-600 dark:text-orange-400">Trending</span>
            <span className="text-slate-900 dark:text-white">&nbsp;destinations</span>
          </h2>

          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "tween", duration: 0.15 }}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors"
          >
            See all
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Destinations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-8 sm:gap-8"
        >
          {destinations.map((item, index) => (
            <DestinationCard key={item.id ?? index} item={item} />
          ))}
        </motion.div>

        {/* Slider Dots */}
        <div className="flex items-center justify-center gap-2 mt-10 sm:mt-14">
          <span className="w-7 h-2 rounded-full bg-slate-900 dark:bg-white transition-all duration-300" />
          <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>
      </div>
    </section>
  );
};

export default memo(TrendingDestinations);