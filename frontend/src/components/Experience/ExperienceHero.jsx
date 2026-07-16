import React from "react";
import { MapPin, Tag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const ExperienceHero = ({ experience, isSaved, onWishlist }) => {
  const heroImage =
    experience?.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb";

  return (
    <section className="relative h-[500px] overflow-hidden">
      <img
        src={heroImage}
        alt={experience.title}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 text-white max-w-4xl">
          <span className="inline-flex items-center gap-2 bg-orange-500 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Tag className="w-4 h-4" />
            {experience.category}
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {experience.title}
          </h1>

          <p className="text-lg text-gray-200 mb-5">
            {experience.shortDescription}
          </p>

          <div className="flex items-center gap-2 text-gray-200">
            <MapPin className="w-5 h-5" />
            {experience.location}
          </div>
           <Button
              variant="outline"
              onClick={onWishlist}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full border-white/20 text-white hover:bg-white/30 hover:text-white"
            >
              <Heart
                size={18}
                className={isSaved ? "fill-red-500 text-red-500" : "text-white"}
              />
              <span>{isSaved ? "Saved" : "Save Activity"}</span>
            </Button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceHero;
