import React from "react";
import {
  CalendarDays,
  Clock3,
  Timer,
  CheckCircle2,
} from "lucide-react";

const EventSchedule = ({ event }) => {
  const formatDate = (date) => {
    if (!date) return "To Be Announced";

    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getEventStatus = () => {
    if (!event.eventDate) return "Upcoming";

    const today = new Date();
    const eventDate = new Date(event.eventDate);

    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate.getTime() > today.getTime()) {
      return "Upcoming";
    }

    if (eventDate.getTime() === today.getTime()) {
      return "Happening Today";
    }

    return "Completed";
  };

  const getStatusColor = () => {
    const status = getEventStatus();

    if (status === "Upcoming")
      return "bg-blue-100 text-blue-700";

    if (status === "Happening Today")
      return "bg-green-100 text-green-700";

    return "bg-gray-100 text-gray-700";
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">
          Event Schedule
        </h2>

        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor()}`}
        >
          {getEventStatus()}
        </span>
      </div>

      <div className="relative">

        {/* Timeline */}

        <div className="absolute left-5 top-2 bottom-2 w-[2px] bg-orange-200" />

        {/* Event Date */}

        <div className="relative flex gap-5 mb-8">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white shrink-0">
            <CalendarDays className="w-5 h-5" />
          </div>

          <div className="bg-orange-50 rounded-xl p-5 flex-1">
            <h3 className="font-semibold text-lg mb-2">
              Event Date
            </h3>

            <p className="text-gray-700">
              {formatDate(event.eventDate)}
            </p>
          </div>
        </div>

        {/* Start Time */}

        <div className="relative flex gap-5 mb-8">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white shrink-0">
            <Clock3 className="w-5 h-5" />
          </div>

          <div className="bg-orange-50 rounded-xl p-5 flex-1">
            <h3 className="font-semibold text-lg mb-2">
              Starts At
            </h3>

            <p className="text-gray-700">
              {event.startTime || "To Be Announced"}
            </p>
          </div>
        </div>

        {/* End Time */}

        <div className="relative flex gap-5 mb-8">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white shrink-0">
            <Timer className="w-5 h-5" />
          </div>

          <div className="bg-orange-50 rounded-xl p-5 flex-1">
            <h3 className="font-semibold text-lg mb-2">
              Ends At
            </h3>

            <p className="text-gray-700">
              {event.endTime || "Until Completion"}
            </p>
          </div>
        </div>

        {/* Status */}

        <div className="relative flex gap-5">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>

          <div className="bg-green-50 rounded-xl p-5 flex-1">
            <h3 className="font-semibold text-lg mb-2">
              Current Status
            </h3>

            <p className="text-gray-700">
              {getEventStatus()}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EventSchedule;