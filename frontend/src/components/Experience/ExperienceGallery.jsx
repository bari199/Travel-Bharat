import React from "react";

const ExperienceGallery = ({ experience }) => {
  if (!experience.images?.length) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">
        Gallery
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {experience.images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl"
          >
            <img
              src={image.url}
              alt={`Experience ${index + 1}`}
              className="w-full h-72 object-cover hover:scale-105 transition duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceGallery;