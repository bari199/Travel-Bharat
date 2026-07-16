import React from "react";
import {
  Clock,
  MapPin,
  IndianRupee,
  Calendar,
  Gauge,
} from "lucide-react";

const ExperienceInfoCards = ({ experience }) => {
  const cards = [
    {
      icon: Clock,
      label: "Duration",
      value: experience.duration,
    },
    {
      icon: MapPin,
      label: "Distance",
      value: experience.distance,
    },
    {
      icon: IndianRupee,
      label: "Price",
      value: experience.priceRange,
    },
    {
      icon: Calendar,
      label: "Best Time",
      value: experience.bestTime,
    },
  ];

  if (experience.difficultyLevel) {
    cards.push({
      icon: Gauge,
      label: "Difficulty",
      value: experience.difficultyLevel,
    });
  }

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {cards.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100"
            >
              <Icon className="w-6 h-6 text-orange-500 mb-3" />

              <p className="text-sm text-gray-500 mb-1">
                {item.label}
              </p>

              <p className="font-semibold text-gray-900">
                {item.value || "-"}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceInfoCards;