import React from "react";
import { MapPin, Map, Building2, Globe } from "lucide-react";

const EventLocation = ({ event }) => {
  const destination = event.destination;

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="w-6 h-6 text-orange-500" />

        <h2 className="text-2xl font-bold">
          Event Location
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Venue */}
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6 text-orange-500" />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">
              Venue
            </p>

            <p className="font-semibold text-gray-900">
              {event.location || "Not Available"}
            </p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
            <Map className="w-6 h-6 text-orange-500" />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">
              Destination
            </p>

            <p className="font-semibold text-gray-900">
              {destination?.name || "Not Available"}
            </p>
          </div>
        </div>

        {/* City */}
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 text-orange-500" />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">
              City
            </p>

            <p className="font-semibold text-gray-900">
              {destination?.city || "Not Available"}
            </p>
          </div>
        </div>

        {/* State */}
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
            <Globe className="w-6 h-6 text-orange-500" />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">
              State
            </p>

            <p className="font-semibold text-gray-900">
              {destination?.state || "Not Available"}
            </p>
          </div>
        </div>
      </div>

      {destination?.location && (
        <div className="mt-8 border-t border-orange-100 pt-6">
          <h3 className="font-semibold text-lg mb-2">
            Destination Address
          </h3>

          <p className="text-gray-600 leading-7">
            {destination.location}
          </p>
        </div>
      )}
    </section>
  );
};

export default EventLocation;