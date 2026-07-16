import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/api";
import ExperienceHero from "./ExperienceHero";
import ExperienceOverview from "./ExperienceOverview";
import ExperienceInfoCards from "./ExperienceInfoCards";
import ExperienceHighlights from "./ExperienceHighlights";
import ExperienceTips from "./ExperienceTips";
import ExperienceGallery from "./ExperienceGallery";
import ExperienceLocation from "./ExperienceLocation";

import { getSingleExperience } from "@/services/Experienceapi";

const ExperienceSingle = () => {
  const { id } = useParams();

  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleWishlist = async () => {
    try {
      const res = await api.post(`/experience-wishlist/${experience._id}`);

      setIsSaved(res.data.saved);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await getSingleExperience(id);

        console.log("Experience Response:", res);

        setExperience(res?.experience || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-20">Loading...</div>;
  }

  if (!experience) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        Experience not found
      </div>
    );
  }

  return (
    <div className="bg-orange-50/30">
      <ExperienceHero
        experience={experience}
        isSaved={isSaved}
        onWishlist={handleWishlist}
      />
      <div className="container mx-auto px-4 py-10 space-y-10">
        <ExperienceOverview experience={experience} />

        <ExperienceInfoCards experience={experience} />

        <ExperienceHighlights experience={experience} />

        <ExperienceTips experience={experience} />

        <ExperienceGallery experience={experience} />

        <ExperienceLocation experience={experience} />
      </div>
    </div>
  );
};

export default ExperienceSingle;
