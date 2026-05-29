import React from "react";
import {
  Check,
  MapPin,
  Mountain,
  Camera,
  Trees,
  Clock3,
  BadgeIndianRupee,
  CalendarDays,
  Star,
  Compass,
  Sparkles,
} from "lucide-react";

const DestinationDescription = () => {
  return (
    <section className="w-full py-8 bg-white">

      <div className="max-w-5xl mx-auto px-5 lg:px-2">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[68%_32%] gap-8">

          {/* LEFT SIDE */}
          <div>

            {/* TOP HEADER */}
            <div className="mb-7">

              <span className="bg-orange-100 text-orange-500 text-xs font-medium px-3 py-1 rounded-full">
                Popular Destination
              </span>

              <h2 className="text-[34px] font-bold text-slate-900 mt-4 leading-tight">
                Overview Destination
              </h2>

              <p className="text-gray-500 text-sm mt-3 leading-7">
                Explore the breathtaking beauty of Darjeeling with
                Himalayan mountain views, tea gardens, waterfalls,
                toy train rides, peaceful weather, photography spots,
                cultural experiences, and unforgettable nature escapes.
              </p>

            </div>





            {/* DESCRIPTION */}
            <div className="space-y-5 text-[15px] leading-8 text-gray-600">

              <p>
                Darjeeling is one of the most famous hill stations
                in India, located in the northern region of West Bengal.
                Surrounded by the Himalayan mountains, waterfalls,
                tea gardens, forests, and cloudy valleys, the destination
                offers breathtaking natural beauty and peaceful weather.
              </p>

              <p>
                Travelers from across India and around the world visit
                Darjeeling to experience mountain landscapes, scenic
                viewpoints, tea plantations, cultural markets,
                monasteries, ropeways, toy train rides, and adventure
                activities.
              </p>

              <p>
                The destination is widely known as the “Queen of the Hills”
                because of its relaxing environment, cool climate,
                Himalayan views, and unforgettable sunrise moments.
              </p>

              <p>
                Visitors can also enjoy Tibetan food, local shopping,
                photography tours, forest walks, waterfalls, and
                luxury mountain cafes while relaxing in nature.
              </p>

            </div>



            {/* DESTINATION HIGHLIGHTS */}
            <div className="mt-14">

              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Destination Highlights
              </h3>

              <div className="space-y-4">

                {[
                  "Experience the magical sunrise from Tiger Hill.",
                  "Ride the UNESCO Darjeeling Himalayan Toy Train.",
                  "Explore beautiful tea gardens and waterfalls.",
                  "Enjoy mountain cafes and peaceful relaxation.",
                  "Visit Tibetan monasteries and local markets.",
                  "Perfect destination for couples and families.",
                  "Capture breathtaking photography locations.",
                  "Enjoy Himalayan food and cultural experiences.",
                ].map((item, index) => (

                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >

                    <Check
                      size={18}
                      className="text-green-600 mt-1 flex-shrink-0"
                    />

                    <p className="text-sm text-gray-700 leading-7">
                      {item}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>





          {/* RIGHT SIDE */}
          <div>

            <div className="sticky top-24 border border-gray-200 rounded-3xl p-6 bg-white shadow-sm">

              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Travel Information
              </h3>

              <div className="space-y-5">

                {/* LOCATION */}
                <div className="flex items-start gap-3">

                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                    <MapPin size={18} className="text-orange-500" />
                  </div>

                  <div>

                    <h4 className="text-sm font-semibold text-slate-900">
                      Location
                    </h4>

                    <p className="text-sm text-gray-500 mt-1">
                      Darjeeling, West Bengal, India
                    </p>

                  </div>

                </div>





                {/* BEST TIME */}
                <div className="flex items-start gap-3">

                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <CalendarDays size={18} className="text-blue-500" />
                  </div>

                  <div>

                    <h4 className="text-sm font-semibold text-slate-900">
                      Best Time
                    </h4>

                    <p className="text-sm text-gray-500 mt-1">
                      October to March
                    </p>

                  </div>

                </div>





                {/* BUDGET */}
                <div className="flex items-start gap-3">

                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <BadgeIndianRupee
                      size={18}
                      className="text-green-600"
                    />
                  </div>

                  <div>

                    <h4 className="text-sm font-semibold text-slate-900">
                      Average Budget
                    </h4>

                    <p className="text-sm text-gray-500 mt-1">
                      ₹8,000 - ₹15,000
                    </p>

                  </div>

                </div>





                {/* DURATION */}
                <div className="flex items-start gap-3">

                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Clock3
                      size={18}
                      className="text-purple-500"
                    />
                  </div>

                  <div>

                    <h4 className="text-sm font-semibold text-slate-900">
                      Ideal Duration
                    </h4>

                    <p className="text-sm text-gray-500 mt-1">
                      3 - 5 Days
                    </p>

                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>





        {/* BOTTOM BORDER */}
        <div className="border-b border-gray-200 mt-12"></div>

      </div>

    </section>
  );
};

export default DestinationDescription;