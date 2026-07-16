import React from "react";
import ExperienceCard from "./ExperienceCard";

const ExperienceGrid = ({ experiences }) => {
  if (!experiences.length) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center">
        <h3 className="text-xl font-semibold">No Experiences Found</h3>
        <p className="text-gray-500 mt-2">Try changing your filters.</p>
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

// Memoized: only re-renders when the `experiences` array reference
// actually changes (i.e. after filtering/pagination), not on every
// keystroke or unrelated state update elsewhere on the page.
export default React.memo(ExperienceGrid);
