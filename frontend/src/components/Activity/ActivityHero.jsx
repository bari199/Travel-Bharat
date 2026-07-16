import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock3,
  Mountain,
  Heart,
  Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ActivityHero = ({ activity, isSaved, onWishlist }) => {
  const image =
    activity?.images?.[0] ||
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

  return (
    <section className="relative overflow-hidden rounded-b-[2rem] dark:bg-slate-900">

      {/* Background Image */}

      <img
        src={image}
        alt={activity.title}
        className="absolute inset-0 h-[65vh] w-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 h-[65vh] bg-gradient-to-t from-black via-black/55 to-black/25" />

      {/* Decorative Gradient */}

      <div className="absolute inset-0 h-[65vh] bg-gradient-to-r from-orange-500/10 via-transparent to-transparent" />

      {/* Content */}

      <div className="relative z-10 mx-auto flex h-[65vh] max-w-7xl items-end px-5 pb-12 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-4xl text-white"
        >

          {/* Top Badges */}

          <div className="mb-6 flex flex-wrap items-center gap-3">

            <Badge className="rounded-full bg-orange-500 px-4 py-1.5 text-sm font-medium hover:bg-orange-500">

              {activity.category}

            </Badge>

            <Button
              variant="outline"
              onClick={onWishlist}
              className="rounded-full border-white/20 bg-white/15 px-5 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/25 hover:text-white"
            >

              <Heart
                className={`mr-2 h-4 w-4 ${
                  isSaved
                    ? "fill-red-500 text-red-500"
                    : "text-white"
                }`}
              />

              {isSaved ? "Saved" : "Save Activity"}

            </Button>

          </div>

          {/* Title */}

          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">

            {activity.title}

          </h1>

          {/* Description */}

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200 md:text-lg">

            {activity.shortDescription}

          </p>

          {/* Information Cards */}

          <div className="mt-8 flex flex-wrap gap-4">

            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-lg">

              <MapPin className="h-5 w-5 text-orange-400" />

              <span className="text-sm font-medium">

                {activity.destination?.city},{" "}
                {activity.destination?.state}

              </span>

            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-lg">

              <Clock3 className="h-5 w-5 text-orange-400" />

              <span className="text-sm font-medium">

                {activity.duration}

              </span>

            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-lg">

              <Mountain className="h-5 w-5 text-orange-400" />

              <span className="text-sm font-medium">

                {activity.difficulty}

              </span>

            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-lg">

              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />

              <span className="text-sm font-medium">

                {activity.activityType}

              </span>

            </div>

          </div>

        </motion.div>

      </div>

      {/* Bottom Fade */}

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />

    </section>
  );
};

export default ActivityHero;