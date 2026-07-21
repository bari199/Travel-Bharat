import React from "react";

const EventOverview = ({ event }) => {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
      <h2 className="text-2xl font-bold mb-5">
        About This Event
      </h2>

      <p className="text-gray-600 leading-8 whitespace-pre-line">
        {event.description}
      </p>
    </section>
  );
};

export default EventOverview;