import React from "react";
import { ExternalLink, MapPin } from "lucide-react";

const TourMap = ({ destination }) => {
  // FIXED FIELD NAME
  const attractions = destination?.nearbyAttractions || [];
  const placeImages = destination?.placeImages || [];

  return (
    <section className="w-full py-8 bg-white">
      <div className="max-w-5xl mx-auto px-5 lg:px-2">
        {/* Heading */}
        <div className="mb-6">
          <span className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
            Travel Route
          </span>

          <h2 className="text-[28px] font-bold text-slate-900 mt-4">
            Tour Map
          </h2>

          <p className="text-sm text-gray-500 leading-7 mt-2 max-w-3xl">
            Discover the complete destination route, nearby attractions,
            travel points, sightseeing locations, and mountain viewpoints.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[68%_32%] gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-5">
            {/* GOOGLE MAP */}
            <div className="overflow-hidden rounded-3xl border border-gray-200 h-[350px]">
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
            </div>

            {/* DESTINATION IMAGES */}
            {placeImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {placeImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-2xl group h-[170px]"
                  >
                    <img
                      src={img}
                      alt={destination?.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />

                    <div className="absolute inset-0 bg-black/20" />

                    <div className="absolute bottom-3 left-3 text-white">
                      <h4 className="text-sm font-semibold">
                        {destination?.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="sticky top-24 border border-gray-200 rounded-3xl p-6 bg-white shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-5">
                Nearby Attractions
              </h3>

              <div className="space-y-5">
                {attractions.length > 0 ? (
                  attractions.map((place, index) => (
                    <div
                      key={index}
                      className="border rounded-2xl overflow-hidden hover:shadow-md transition"
                    >
                      {/* FIXED image */}
                      {place?.image ? (
                        <img
                          src={place.image}
                          alt={place.title}
                          className="h-24 w-full object-cover"
                        />
                      ) : (
                        <div className="h-24 bg-gray-100 flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-gray-400" />
                        </div>
                      )}

                      <div className="p-3">
                        <h4 className="text-sm font-semibold text-slate-900">
                          {place?.title}
                        </h4>

                        {/* FIXED description */}
                        <p className="text-xs text-gray-500 mt-1">
                          {place?.description}
                        </p>

                        {/* FIXED mapLink */}
                        {place?.mapLink && (
                          <a
                            href={place.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                          >
                            View on Map
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 border rounded-2xl p-4">
                    No nearby attractions available.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-b border-gray-200 mt-10"></div>
      </div>
    </section>
  );
};

export default TourMap;