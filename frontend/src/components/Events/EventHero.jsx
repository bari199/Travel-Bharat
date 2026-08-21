import React from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Tag,
  IndianRupee,
} from "lucide-react";

const EventHero = ({ event }) => {
  const heroImage =
    event?.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30";

  const formatDate = (date) => {
    if (!date) return "Date Not Announced";

    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="relative h-[550px] overflow-hidden">
      {/* Hero Image */}
      <img
        src={heroImage}
        alt={event.title}
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 max-w-5xl text-white">

          {/* Category */}
          {event.category && (
            <span className="inline-flex items-center gap-2 bg-orange-500 px-4 py-2 rounded-full text-sm font-medium mb-5">
              <Tag className="w-4 h-4" />
              {event.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
            {event.title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mb-8">
            {event.shortDescription}
          </p>

          {/* Info */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Date */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3">
              <CalendarDays className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-xs text-gray-300">
                  Event Date
                </p>
                <p className="font-medium">
                  {formatDate(event.eventDate)}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3">
              <Clock className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-xs text-gray-300">
                  Time
                </p>
                <p className="font-medium">
                  {event.startTime || "--:--"}
                  {event.endTime && ` - ${event.endTime}`}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3">
              <MapPin className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-xs text-gray-300">
                  Venue
                </p>
                <p className="font-medium">
                  {event.location || "TBA"}
                </p>
              </div>
            </div>

            {/* Ticket */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3">
              <IndianRupee className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-xs text-gray-300">
                  Ticket
                </p>
                <p className="font-medium">
                  {event.ticketPrice > 0
                    ? `₹${event.ticketPrice}`
                    : "Free Entry"}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default EventHero;