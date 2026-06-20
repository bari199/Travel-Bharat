import React from "react";
import { CalendarDays, Ticket, LayoutGrid, MapPin, AreaChart } from "lucide-react";

const TourInfoCards = ({ destination }) => {
  return (
    <section className="w-full py-4 bg-white">
      <div className="max-w-5xl mx-auto px-5 lg:px-2">
        <div className="flex flex-wrap gap-2">
          {/* Best Time */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-2 bg-white min-w-[170px]">
            <div className="w-8 h-8 rounded-md border bg-blue-100 border-gray-200 flex items-center justify-center">
              <CalendarDays size={15} className="text-blue-700" />
            </div>

            <div>
              <h3 className="text-[11px] font-semibold text-slate-900 leading-none">
                Best Time
              </h3>

              <p className="text-[10px] text-gray-500 mt-1">
                {destination?.bestTimeToVisit}
              </p>
            </div>
          </div>

          {/* Entry Fee */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-2 bg-white min-w-[170px]">
            <div className="w-8 h-8 rounded-md border bg-green-100 border-gray-200 flex items-center justify-center">
              <Ticket size={15} className="text-green-700" />
            </div>

            <div>
              <h3 className="text-[11px] font-semibold text-slate-900 leading-none">
                Entry Fee
              </h3>

              <p className="text-[10px] text-gray-500 mt-1">
                {destination?.entryFee}
              </p>
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-2 bg-white min-w-[170px]">
            <div className="w-8 h-8 rounded-md border bg-pink-100 border-gray-200 flex items-center justify-center">
              <LayoutGrid size={15} className="text-pink-700" />
            </div>

            <div>
              <h3 className="text-[11px] font-semibold text-slate-900 leading-none">
                Category
              </h3>

              <p className="text-[10px] text-gray-500 mt-1">
                {destination?.category}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-2 bg-white min-w-[170px]">
            <div className="w-8 h-8 rounded-md border bg-red-100 border-gray-200 flex items-center justify-center">
              <MapPin size={15} className="text-red-700" />
            </div>

            <div>
              <h3 className="text-[11px] font-semibold text-slate-900 leading-none">
                Location
              </h3>

              <p className="text-[10px] text-gray-500 mt-1">
                {destination?.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-2 bg-white min-w-[170px]">
            <div className="w-8 h-8 rounded-md border bg-red-100 border-gray-200 flex items-center justify-center">
              <AreaChart size={15} className="text-red-700" />
            </div>

            <div>
              <h3 className="text-[11px] font-semibold text-slate-900 leading-none">
                Area
              </h3>

              <p className="text-[10px] text-gray-500 mt-1">
                {destination?.area}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourInfoCards;
