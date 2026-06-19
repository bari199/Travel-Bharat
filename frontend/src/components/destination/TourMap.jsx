import React from "react";
import {
ExternalLink,
MapPin,
Navigation,
CalendarDays,
Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

const TourMap = ({ destination }) => {
const attractions = destination?.nearbyAttractions || [];
const placeImages = destination?.placeImages || [];

return ( <section className="w-full py-10 bg-gradient-to-b from-white to-orange-50/30"> <div className="max-w-7xl mx-auto px-4 lg:px-6">

    {/* Header */}
    <div className="mb-10">
      <Badge className="rounded-full px-4 py-1 bg-orange-100 text-orange-600 hover:bg-orange-100">
        🗺️ Travel Route Guide
      </Badge>

      <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-4">
        Explore Nearby Attractions
      </h2>

      <p className="text-slate-500 mt-4 max-w-3xl leading-7">
        Discover viewpoints, hidden gems, local attractions and
        unforgettable experiences around {destination?.name}.
      </p>
    </div>

    {/* Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-[68%_32%] gap-8">

      {/* LEFT */}
      <div className="space-y-8">

        {/* Google Map */}
        <div className="relative overflow-hidden rounded-3xl border bg-white shadow-xl h-[420px]">

          <iframe
            title={destination?.name}
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              destination?.location || ""
            )}&output=embed`}
            width="100%"
            height="100%"
            loading="lazy"
            className="w-full h-full"
          />

          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold">
                {destination?.location}
              </span>
            </div>
          </div>
        </div>

        {/* Gallery Header */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900">
            Top Places You Shouldn't Miss
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Handpicked attractions around this destination
          </p>
        </div>

        {/* Images */}
        {placeImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {placeImages.map((img, index) => (
              <div
                key={index}
                className="relative h-[180px] overflow-hidden rounded-3xl group"
              >
                <img
                  src={img}
                  alt={destination?.name}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl px-3 py-2">
                    <h4 className="text-white font-semibold">
                      {destination?.name}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT SIDEBAR */}
      <div>

        <div className="sticky top-24 bg-white border rounded-3xl p-6 shadow-sm">

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900">
              Nearby Attractions
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {attractions.length} places worth visiting
            </p>
          </div>

          <div className="space-y-5">

            {attractions.length > 0 ? (
              attractions.map((place, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-3xl border bg-white hover:shadow-lg transition duration-300"
                >

                  {/* Image */}
                  {place?.image ? (
                    <img
                      src={place.image}
                      alt={place.title}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="h-40 bg-slate-100 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-slate-400" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">

                    <h4 className="text-lg font-bold text-slate-900">
                      {place?.title}
                    </h4>

                    {/* Distance */}
                    {place?.distance && (
                      <div className="flex items-center gap-2 mt-2 text-orange-600">
                        <Navigation className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {place.distance}
                        </span>
                      </div>
                    )}

                    {/* Best Time */}
                    {place?.bestTime && (
                      <div className="flex items-center gap-2 mt-2 text-sky-600">
                        <CalendarDays className="w-4 h-4" />
                        <span className="text-sm">
                          {place.bestTime}
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    {place?.description && (
                      <p className="text-sm text-slate-600 mt-3 leading-6">
                        {place.description}
                      </p>
                    )}

                    {/* Highlights */}
                    {place?.highlights?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {place.highlights.map(
                          (highlight, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="rounded-full"
                            >
                              <Star className="w-3 h-3 mr-1" />
                              {highlight}
                            </Badge>
                          )
                        )}
                      </div>
                    )}

                    {/* Map Button */}
                    {place?.mapLink && (
                      <a
                        href={place.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        View on Google Maps
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="border rounded-2xl p-6 text-center text-slate-500">
                No nearby attractions available.
              </div>
            )}

          </div>
        </div>

      </div>
    </div>

    <div className="border-b mt-12"></div>
  </div>
</section>

);
};

export default TourMap;
