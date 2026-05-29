import React from "react";
import {
  MapPin,
  ExternalLink,
} from "lucide-react";

const TourMap = () => {
  const attractions = [
    {
      title: "Tiger Hill",
      desc: "Famous sunrise point with Himalayan views.",
      img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      map: "https://maps.google.com/?q=Tiger+Hill+Darjeeling",
    },
    {
      title: "Batasia Loop",
      desc: "Iconic railway loop with mountain scenery.",
      img: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200&auto=format&fit=crop",
      map: "https://maps.google.com/?q=Batasia+Loop",
    },
    {
      title: "Tea Garden",
      desc: "Green tea estates with peaceful landscape.",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      map: "https://maps.google.com/?q=Darjeeling+Tea+Garden",
    },
  ];

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
                title="Darjeeling Map"
                src="https://www.google.com/maps?q=Darjeeling&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                className="w-full h-full"
              />
            </div>

            {/* DESTINATION IMAGES */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {attractions.map((item, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-2xl group h-[170px]"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute bottom-3 left-3 text-white">
                    <h4 className="text-sm font-semibold">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - NEARBY ATTRACTIONS */}
          <div>
            <div className="sticky top-24 border border-gray-200 rounded-3xl p-6 bg-white shadow-sm">

              <h3 className="text-xl font-bold text-slate-900 mb-5">
                Nearby Attractions
              </h3>

              <div className="space-y-5">

                {attractions.map((place, index) => (
                  <div
                    key={index}
                    className="border rounded-2xl overflow-hidden hover:shadow-md transition"
                  >
                    <img
                      src={place.img}
                      alt={place.title}
                      className="h-24 w-full object-cover"
                    />

                    <div className="p-3">
                      <h4 className="text-sm font-semibold text-slate-900">
                        {place.title}
                      </h4>

                      <p className="text-xs text-gray-500 mt-1">
                        {place.desc}
                      </p>

                      <a
                        href={place.map}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                      >
                        View on Map <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                ))}

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