import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { reviews } from "../../data/data";

import CustomerReviewsSectionSkeleton from "../skeletons/CustomerReviewsSectionSkeleton";

const CustomerReviewsSection = () => {
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === reviews.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [loading]);

  if (loading) {
    return <CustomerReviewsSectionSkeleton />;
  }

  const activeReview = reviews[activeIndex];

  return (
    <section className="w-full bg-[#f8f8f8] dark:bg-slate-900 py-20 px-4 md:px-10 rounded-[30px] overflow-hidden transition-colors duration-300">
      <div className="max-w-5xl mx-auto text-center relative">

        {/* Heading */}
        <div className="mb-16">
          <p className="text-orange-500 dark:text-orange-400 uppercase tracking-[4px] text-sm font-semibold">
            Testimonials
          </p>

          <div className="flex items-center justify-center gap-2 mt-5">
            <h2 className="text-3xl md:text-3xl font-medium text-gray-900 dark:text-white mt-2">
              Customer Reviews
            </h2>
          </div>
        </div>

        {/* Floating Avatars */}
        <div className="absolute inset-0 hidden md:block pointer-events-none">
          {reviews.map((review, index) => {
            const positions = [
              "top-10 left-10",
              "top-0 left-1/3",
              "top-20 right-16",
              "bottom-20 left-20",
              "bottom-10 right-24",
            ];

            return (
              <motion.img
                key={review.id}
                src={review.image}
                alt={review.name}
                initial={{ opacity: 0.4 }}
                animate={{
                  scale: activeIndex === index ? 1.2 : 0.9,
                  opacity: activeIndex === index ? 1 : 0.4,
                }}
                transition={{ duration: 0.4 }}
                className={`absolute ${
                  positions[index % positions.length]
                } w-14 h-14 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl`}
              />
            );
          })}
        </div>

        {/* Review Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeReview.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="max-w-2xl mx-auto border-0 shadow-none bg-transparent">
              <CardContent className="flex flex-col items-center">

                {/* Avatar */}
                <div className="relative">
                  <img
                    src={activeReview.image}
                    alt={activeReview.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl"
                  />

                  <div className="absolute -top-2 -left-2 bg-orange-500 text-white p-2 rounded-full shadow-lg">
                    <Quote className="w-4 h-4" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-6">
                  {[...Array(activeReview.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-orange-400 stroke-orange-400"
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed mt-6 max-w-xl">
                  "{activeReview.review}"
                </p>

                {/* User Info */}
                <div className="mt-6">
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white">
                    {activeReview.name}
                  </h4>

                  <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
                    {activeReview.role}
                  </p>
                </div>

                {/* Dots */}
                <div className="flex items-center gap-2 mt-8">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        activeIndex === index
                          ? "w-8 bg-gray-900 dark:bg-white"
                          : "w-2.5 bg-gray-300 dark:bg-slate-600"
                      }`}
                    />
                  ))}
                </div>

              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default CustomerReviewsSection;