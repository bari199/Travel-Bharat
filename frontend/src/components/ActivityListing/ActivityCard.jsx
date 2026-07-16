import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, IndianRupee, ArrowRight, Gauge } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ActivityCard = ({ activity }) => {
  const image =
    activity?.images?.[0] ||
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

  const city = activity?.destination?.city;
  const state = activity?.destination?.state;

  const priceLabel =
    !activity.price || activity.price === 0 ? "Free" : `₹${activity.price}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >

      <Card 
        className="
          overflow-hidden 
          border-orange-100 
          dark:border-slate-700
          dark:bg-slate-900
          hover:shadow-xl 
          hover:shadow-orange-100/60 
          transition-shadow 
          duration-300 
          py-0 
          gap-0
        "
      >

        {/* Image */}
        <div className="relative h-40 sm:h-44 overflow-hidden">

          <img
            src={image}
            alt={activity.title}
            loading="lazy"
            className="
              w-full 
              h-full 
              object-cover 
              transition-transform 
              duration-500 
              hover:scale-105
            "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />


          {activity.difficulty && (
            <Badge 
              className="
                absolute 
                top-3 
                left-3 
                bg-orange-500 
                hover:bg-orange-500 
                text-white 
                text-[10px] 
                font-semibold 
                px-3 
                py-1 
                rounded-full 
                uppercase 
                tracking-wide
              "
            >
              {activity.difficulty}
            </Badge>
          )}


          <div className="
            absolute 
            bottom-3 
            right-3 
            flex 
            items-center 
            gap-1 
            bg-black/50 
            backdrop-blur-sm 
            text-white 
            text-xs 
            font-medium 
            px-2.5 
            py-1 
            rounded-lg
          ">
            <IndianRupee className="w-3.5 h-3.5 text-yellow-400" />
            {priceLabel}
          </div>

        </div>


        {/* Body */}
        <CardContent className="p-4">


          {(city || state) && (
            <div className="
              flex 
              items-center 
              gap-1.5 
              text-xs 
              text-gray-400 
              dark:text-gray-400
              mb-1.5
            ">
              <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />

              <span className="truncate">
                {[city, state].filter(Boolean).join(", ")}
              </span>

            </div>
          )}



          <h3 className="
            text-base 
            font-semibold 
            text-gray-900
            dark:text-white
            mb-2 
            truncate
          ">
            {activity.title}
          </h3>



          <Badge
            variant="secondary"
            className="
              bg-orange-50 
              text-orange-700 
              hover:bg-orange-50 
              dark:bg-orange-500/10
              dark:text-orange-400
              text-[11px] 
              font-medium 
              px-3 
              py-0.5 
              rounded-full 
              mb-3
            "
          >
            {activity.category}
          </Badge>



          <p className="
            text-gray-500 
            dark:text-gray-400
            text-xs 
            leading-relaxed 
            line-clamp-2 
            mb-4
          ">
            {activity.shortDescription}
          </p>



          {/* Meta pills */}
          <div className="flex gap-2 mb-4">


            <div className="
              flex 
              items-center 
              gap-1 
              text-xs 
              text-gray-500
              dark:text-gray-400
              bg-gray-50
              dark:bg-slate-800
              rounded-lg 
              px-2.5 
              py-1.5 
              flex-1 
              min-w-0 
              truncate
            ">
              <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />

              <span className="truncate">
                {activity.duration || "Flexible"}
              </span>

            </div>



            <div className="
              flex 
              items-center 
              gap-1 
              text-xs 
              text-gray-500
              dark:text-gray-400
              bg-gray-50
              dark:bg-slate-800
              rounded-lg 
              px-2.5 
              py-1.5 
              flex-1 
              min-w-0 
              truncate
            ">
              <Gauge className="w-3.5 h-3.5 text-orange-400 shrink-0" />

              <span className="truncate">
                {activity.activityType}
              </span>

            </div>


          </div>



          <Button
            asChild
            className="
              w-full 
              bg-orange-500 
              hover:bg-orange-600 
              text-white 
              text-sm 
              font-medium 
              rounded-xl
            "
          >
            <Link to={`/activity/${activity.slug || activity._id}`}>
              View details 
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>


        </CardContent>

      </Card>

    </motion.div>
  );
};


// Memoized so filter/sort changes elsewhere on the page don't force
// every card in the grid to re-render.
export default React.memo(ActivityCard);