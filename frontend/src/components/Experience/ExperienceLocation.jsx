import React from "react";
import { MapPin } from "lucide-react";

const ExperienceLocation = ({ experience }) => {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <MapPin className="w-6 h-6 text-orange-500" />

        <h2 className="text-2xl font-bold">
          Location
        </h2>
      </div>

      <div className="space-y-3">
        <p className="text-gray-700">
          <span className="font-semibold">
            Experience Location:
          </span>{" "}
          {experience.location}
        </p>

        {experience.destination?.name && (
          <p className="text-gray-700">
            <span className="font-semibold">
              Destination:
            </span>{" "}
            {experience.destination.name}
          </p>
        )}
      </div>
    </section>
  );
};

export default ExperienceLocation;