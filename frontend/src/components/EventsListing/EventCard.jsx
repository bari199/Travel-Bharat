import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  MapPin,
  IndianRupee,
  ArrowRight,
  Tag,
} from "lucide-react";

const EventCard = ({ event }) => {
  const formatDate = (date) => {
    if (!date) return "TBA";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const image =
  event?.images?.[0]?.url ||
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30";

  return (
    <article className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-orange-100 dark:border-slate-700 hover:shadow-xl hover:shadow-orange-100/60 dark:hover:shadow-slate-950/60 transition-all duration-300 hover:-translate-y-1">

      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {event.featured && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            Featured
          </span>
        )}

        {event.category && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-gray-800 dark:text-slate-100 text-xs font-medium px-2.5 py-1 rounded-lg">
            <Tag className="w-3.5 h-3.5 text-orange-500" />
            {event.category}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">

        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {event.title}
        </h3>

        <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">
          {event.shortDescription}
        </p>

        {/* Meta pills */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-300 bg-gray-50 dark:bg-slate-800 rounded-lg px-2.5 py-1.5 min-w-0 truncate">
            <CalendarDays className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="truncate">{formatDate(event.eventDate)}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-300 bg-gray-50 dark:bg-slate-800 rounded-lg px-2.5 py-1.5 min-w-0 truncate">
            <Clock3 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="truncate">
              {event.startTime || "TBA"}
              {event.endTime && ` - ${event.endTime}`}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-300 bg-gray-50 dark:bg-slate-800 rounded-lg px-2.5 py-1.5 min-w-0 truncate">
            <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="truncate">
              {event.location || "Venue TBA"}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-300 bg-gray-50 dark:bg-slate-800 rounded-lg px-2.5 py-1.5 min-w-0 truncate">
            <IndianRupee className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="truncate">
              {event.ticketPrice > 0 ? `₹${event.ticketPrice}` : "Free Entry"}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-800 mb-3">
          <span className="text-xs text-gray-500 dark:text-slate-400 truncate">
            {event.organizer || "Organizer TBA"}
          </span>
        </div>

        <Link
          to={`/events/${event._id}`}
          className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
        >
          View details <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};

export default React.memo(EventCard);