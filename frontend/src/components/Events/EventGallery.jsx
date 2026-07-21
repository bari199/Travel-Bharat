import React from "react";

const EventGallery = ({ event }) => {
  if (!event?.images?.length) {
    return null;
  }

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            Event Gallery
          </h2>

          <p className="text-gray-500 mt-1">
            Browse photos from this event.
          </p>
        </div>

        <span className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium">
          {event.images.length} Photos
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {event.images.map((image, index) => (
          <div
            key={index}
            className="group overflow-hidden rounded-2xl border border-orange-100"
          >
            <img
              src={image}
              alt={`${event.title} ${index + 1}`}
              loading="lazy"
              className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventGallery;