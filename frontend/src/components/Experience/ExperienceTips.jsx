import React from "react";
import { Lightbulb } from "lucide-react";

const ExperienceTips = ({ experience }) => {
  if (!experience.tips?.length) {
    return null;
  }

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-6 h-6 text-yellow-500" />

        <h2 className="text-2xl font-bold">
          Helpful Tips
        </h2>
      </div>

      <div className="space-y-4">
        {experience.tips.map((tip, index) => (
          <div
            key={index}
            className="flex gap-3 p-4 rounded-xl bg-orange-50"
          >
            <span className="font-bold text-orange-600">
              {index + 1}.
            </span>

            <p className="text-gray-700">
              {tip}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceTips;