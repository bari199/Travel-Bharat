import React from "react";
import { CalendarDays, Ticket, LayoutGrid, MapPin, AreaChart } from "lucide-react";

const INFO_ITEMS = (destination) => [
  {
    key: "bestTime",
    icon: CalendarDays,
    label: "Best Time",
    value: destination?.bestTimeToVisit,
    iconBg: "bg-blue-100 dark:bg-blue-500/15",
    iconColor: "text-blue-700 dark:text-blue-400",
  },
  {
    key: "entryFee",
    icon: Ticket,
    label: "Entry Fee",
    value: destination?.entryFee,
    iconBg: "bg-green-100 dark:bg-green-500/15",
    iconColor: "text-green-700 dark:text-green-400",
  },
  {
    key: "category",
    icon: LayoutGrid,
    label: "Category",
    value: destination?.category,
    iconBg: "bg-pink-100 dark:bg-pink-500/15",
    iconColor: "text-pink-700 dark:text-pink-400",
  },
  {
    key: "location",
    icon: MapPin,
    label: "Location",
    value: destination?.location,
    iconBg: "bg-red-100 dark:bg-red-500/15",
    iconColor: "text-red-700 dark:text-red-400",
  },
  {
    key: "area",
    icon: AreaChart,
    label: "Area",
    value: destination?.area,
    iconBg: "bg-orange-100 dark:bg-orange-500/15",
    iconColor: "text-orange-700 dark:text-orange-400",
  },
];

const TourInfoCards = ({ destination }) => {
  const items = INFO_ITEMS(destination);

  return (
    <section className="w-full py-4 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-5 lg:px-2">
        <div className="flex flex-wrap gap-2.5">
          {items.map(({ key, icon: Icon, label, value, iconBg, iconColor }) => (
            <div
              key={key}
              className="
                flex items-center gap-2.5
                border border-gray-200 dark:border-slate-700
                rounded-xl px-3 py-2.5
                bg-white dark:bg-slate-900
                min-w-[170px]
                shadow-sm hover:shadow-md
                hover:border-orange-200 dark:hover:border-orange-500/30
                transition-all duration-200
              "
            >
              <div
                className={`w-8 h-8 rounded-md border border-gray-200 dark:border-slate-700 flex items-center justify-center shrink-0 ${iconBg}`}
              >
                <Icon size={15} className={iconColor} />
              </div>

              <div className="min-w-0">
                <h3 className="text-[11px] font-semibold text-slate-900 dark:text-slate-100 leading-none">
                  {label}
                </h3>

                <p className="text-[10px] text-gray-500 dark:text-slate-400 mt-1 truncate">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourInfoCards;