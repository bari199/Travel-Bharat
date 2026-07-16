import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, Calendar, Ticket, ArrowRight } from "lucide-react";

const DestinationCard = ({ destination }) => {
  const image =
    destination?.images?.[0] ||
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-orange-100 dark:border-slate-700 hover:shadow-xl hover:shadow-orange-100/60 dark:hover:shadow-slate-950/60 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {destination.featured && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            Featured
          </span>
        )}

        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-lg">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          {destination.rating}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-400 mb-1.5">
          <MapPin className="w-3.5 h-3.5 text-orange-400" />
          {destination.city}, {destination.state}
        </div>

        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 truncate">
          {destination.name}
        </h3>

        <span className="inline-block bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 text-[11px] font-medium px-3 py-0.5 rounded-full mb-3">
          {destination.category}
        </span>

        <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">
          {destination.shortDescription}
        </p>

        {/* Meta pills */}
        <div className="flex gap-2 mb-4">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-300 bg-gray-50 dark:bg-slate-800 rounded-lg px-2.5 py-1.5 flex-1 min-w-0 truncate">
            <Calendar className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="truncate">{destination.bestTimeToVisit}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-300 bg-gray-50 dark:bg-slate-800 rounded-lg px-2.5 py-1.5 flex-1 min-w-0 truncate">
            <Ticket className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="truncate">{destination.entryFee}</span>
          </div>
        </div>

        <Link
          to={`/destination/${destination._id}`}
          className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
        >
          View details <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

// Memoized so filter/sort changes elsewhere on the page don't force
// every card in the grid to re-render.
export default React.memo(DestinationCard);