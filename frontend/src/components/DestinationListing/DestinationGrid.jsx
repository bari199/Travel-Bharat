import React from "react";
import DestinationCard from "./DestinationCard";

const DestinationGrid = ({
  destinations,
}) => {
  if (!destinations.length) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center">
        <h3 className="text-xl font-semibold">
          No Destinations Found
        </h3>

        <p className="text-gray-500 mt-2">
          Try changing your filters.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >
      {destinations.map((destination) => (
        <DestinationCard
          key={destination._id}
          destination={destination}
        />
      ))}
    </div>
  );
};

export default DestinationGrid;