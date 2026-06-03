import React, {
  useEffect,
  useState,
} from "react";

import { Star } from "lucide-react";

import api from "@/lib/api";

const RatingSection = ({
  destinationId,
}) => {
  const [rating, setRating] =
    useState(0);

  const [averageRating, setAverageRating] =
    useState(0);

  const [totalRatings, setTotalRatings] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const fetchRatings =
    async () => {
      try {
        const res =
          await api.get(
            `/ratings/${destinationId}`
          );

        setAverageRating(
          res.data.averageRating
        );

        setTotalRatings(
          res.data.totalRatings
        );
      } catch (error) {
        console.log(error);
      }
    };

  const submitRating =
    async (selectedRating) => {
      try {
        setLoading(true);

        await api.post("/ratings", {
          destinationId,
          rating: selectedRating,
        });

        setRating(selectedRating);

        fetchRatings();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (destinationId) {
      fetchRatings();
    }
  }, [destinationId]);

  return (
    <section className="max-w-5xl mx-auto px-5 py-10">

      <div className="border rounded-3xl p-8 bg-white shadow-sm">

        <h2 className="text-2xl font-bold">
          Destination Rating
        </h2>

        <div className="flex items-center gap-4 mt-4">

          <span className="text-4xl font-bold text-orange-500">
            {averageRating}
          </span>

          <div>
            <div className="flex">
              {[1,2,3,4,5].map(
                (star) => (
                  <Star
                    key={star}
                    size={20}
                    className={`${
                      star <=
                      Math.round(
                        averageRating
                      )
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                )
              )}
            </div>

            <p className="text-sm text-gray-500">
              {totalRatings} Ratings
            </p>
          </div>

        </div>

        <div className="mt-8">

          <p className="font-medium mb-3">
            Rate this destination
          </p>

          <div className="flex gap-2">

            {[1,2,3,4,5].map(
              (star) => (
                <Star
                  key={star}
                  size={28}
                  onClick={() =>
                    submitRating(star)
                  }
                  className={`cursor-pointer transition ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              )
            )}

          </div>

          {loading && (
            <p className="mt-3 text-sm text-gray-500">
              Saving...
            </p>
          )}

        </div>

      </div>

    </section>
  );
};

export default RatingSection;