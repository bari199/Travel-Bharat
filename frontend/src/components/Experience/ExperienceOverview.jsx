import React from "react";

const ExperienceOverview = ({ experience }) => {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-4">
        About This Experience
      </h2>

      <p className="text-gray-600 leading-relaxed">
        {experience.description}
      </p>
    </section>
  );
};

export default ExperienceOverview;