import React from "react";
import {
  User,
  CalendarDays,
  Clock3,
  MapPin,
  BadgeCheck,
} from "lucide-react";

const EventOrganizer = ({ event }) => {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-orange-500" />

        <h2 className="text-2xl font-bold">
          Organizer Details
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Organizer */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
            <BadgeCheck className="w-6 h-6 text-orange-500" />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">
              Organizer
            </p>

            <p className="font-semibold text-gray-900">
              {event.organizer || "Organizer details will be announced soon."}
            </p>
          </div>
        </div>

        {/* Event Date */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
            <CalendarDays className="w-6 h-6 text-orange-500" />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">
              Event Date
            </p>

            <p className="font-semibold text-gray-900">
              {event.eventDate
                ? new Date(event.eventDate).toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "To Be Announced"}
            </p>
          </div>
        </div>

        {/* Event Time */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
            <Clock3 className="w-6 h-6 text-orange-500" />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">
              Event Timing
            </p>

            <p className="font-semibold text-gray-900">
              {event.startTime || "--:--"}
              {event.endTime && ` - ${event.endTime}`}
            </p>
          </div>
        </div>

        {/* Venue */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 text-orange-500" />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">
              Venue
            </p>

            <p className="font-semibold text-gray-900">
              {event.location || "Venue will be announced soon."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-orange-50 border border-orange-100 p-5">
        <h3 className="font-semibold text-lg mb-2 text-gray-900">
          About the Organizer
        </h3>

        <p className="text-gray-600 leading-7">
          This event is organized by{" "}
          <span className="font-semibold text-orange-600">
            {event.organizer || "the organizing committee"}
          </span>
          . Please follow the official event guidelines and arrive at the venue
          before the scheduled start time. Keep your ticket or registration
          confirmation ready for a smooth check-in experience.
        </p>
      </div>
    </section>
  );
};

export default EventOrganizer;