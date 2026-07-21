import React from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  User,
  IndianRupee,
  Star,
} from "lucide-react";

const EventInfoCards = ({ event }) => {
  const formatDate = (date) => {
    if (!date) return "TBA";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const cards = [
    {
      icon: CalendarDays,
      label: "Event Date",
      value: formatDate(event.eventDate),
    },
    {
      icon: Clock3,
      label: "Start Time",
      value: event.startTime || "TBA",
    },
    {
      icon: Clock3,
      label: "End Time",
      value: event.endTime || "TBA",
    },
    {
      icon: User,
      label: "Organizer",
      value: event.organizer || "Not Available",
    },
    {
      icon: MapPin,
      label: "Venue",
      value: event.location || "Not Available",
    },
    {
      icon: IndianRupee,
      label: "Ticket Price",
      value:
        event.ticketPrice > 0
          ? `₹${event.ticketPrice}`
          : "Free Entry",
    },
  ];

  if (event.featured) {
    cards.push({
      icon: Star,
      label: "Featured",
      value: "Yes",
    });
  }

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {cards.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5 hover:shadow-md transition"
            >
              <Icon className="w-6 h-6 text-orange-500 mb-4" />

              <p className="text-sm text-gray-500 mb-1">
                {item.label}
              </p>

              <p className="font-semibold text-gray-900 break-words">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EventInfoCards;