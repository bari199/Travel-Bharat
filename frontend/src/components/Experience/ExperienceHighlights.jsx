import React from "react";
import { CheckCircle2 } from "lucide-react";

const ExperienceHighlights = ({ experience }) => {
  if (
    !experience.highlights ||
    experience.highlights.length === 0
  ) {
    return null;
  }

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">
        Highlights
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {experience.highlights.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />

            <p className="text-gray-700">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceHighlights;