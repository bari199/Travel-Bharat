import React from "react";
import ExperienceCard from "./ExperienceCard";

const ExperienceGrid = ({ experiences }) => {
  if (!experiences.length) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-orange-100 dark:border-slate-700 rounded-2xl p-10 text-center">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">No Experiences Found</h3>
        <p className="text-gray-500 dark:text-slate-400 mt-2">Try changing your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {experiences.map((experience) => (
        <ExperienceCard key={experience._id} experience={experience} />
      ))}
    </div>
  );
};

export default React.memo(ExperienceGrid);