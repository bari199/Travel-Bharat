import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, Ruler, IndianRupee, ArrowRight, Gauge } from "lucide-react";

/* Difficulty → color mapping. Falls back to gray for anything
   unrecognized instead of guessing a severity. */
const DIFFICULTY_STYLES = {
  easy: "bg-emerald-50 text-emerald-700",
  moderate: "bg-amber-50 text-amber-700",
  challenging: "bg-orange-50 text-orange-700",
  difficult: "bg-rose-50 text-rose-700",
};

const getDifficultyStyle = (level) => {
  const key = String(level || "").trim().toLowerCase();
  return DIFFICULTY_STYLES[key] || "bg-gray-50 text-gray-600";
};

const ExperienceCard = ({ experience }) => {
  const image =
    experience?.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368";

  const destinationName = experience?.destination?.name;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl overflow-hidden border border-orange-100 hover:shadow-xl hover:shadow-orange-100/60 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={experience.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {experience.category && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            {experience.category}
          </span>
        )}

        {experience.difficultyLevel && (
          <div
            className={`absolute bottom-3 right-3 flex items-center gap-1 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-lg ${getDifficultyStyle(
              experience.difficultyLevel
            )}`}
          >
            <Gauge className="w-3.5 h-3.5" />
            {experience.difficultyLevel}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1.5">
          <MapPin className="w-3.5 h-3.5 text-orange-400" />
          {experience.location || destinationName || "—"}
        </div>

        <h3 className="text-base font-semibold text-gray-900 mb-2 truncate">
          {experience.title}
        </h3>

        {destinationName && (
          <span className="inline-block bg-orange-50 text-orange-700 text-[11px] font-medium px-3 py-0.5 rounded-full mb-3">
            {destinationName}
          </span>
        )}

        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
          {experience.shortDescription}
        </p>

        {/* Meta pills */}
        <div className="flex gap-2 mb-4">
          <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 rounded-lg px-2.5 py-1.5 flex-1 min-w-0 truncate">
            <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="truncate">{experience.duration || "—"}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 rounded-lg px-2.5 py-1.5 flex-1 min-w-0 truncate">
            <IndianRupee className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="truncate">{experience.priceRange || "—"}</span>
          </div>
        </div>

        {experience.distance && (
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-4">
            <Ruler className="w-3.5 h-3.5 text-orange-400" />
            {experience.distance}
          </div>
        )}

        <Link
          to={`/experience/${experience._id}`}
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
export default React.memo(ExperienceCard);
