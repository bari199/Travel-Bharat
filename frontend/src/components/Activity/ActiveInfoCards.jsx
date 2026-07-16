import React from "react";
import { motion } from "framer-motion";

import {
  IndianRupee,
  Calendar,
  User,
  Dumbbell,
  Clock3,
  MapPin,
  Info,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const ActivityInfoCards = ({ activity }) => {
  const cards = [
    {
      icon: IndianRupee,
      title: "Price",
      value: activity.price === 0 ? "Free" : `₹${activity.price}`,
    },
    {
      icon: User,
      title: "Age Limit",
      value: `${activity.minimumAge} - ${activity.maximumAge}`,
    },
    {
      icon: Dumbbell,
      title: "Fitness",
      value: activity.fitnessLevel,
    },
    {
      icon: Clock3,
      title: "Opening Hours",
      value: activity.openingHours,
    },
    {
      icon: Calendar,
      title: "Best Time",
      value: activity.bestTime,
    },
    {
      icon: MapPin,
      title: "Location",
      value: activity.location,
    },
  ];

  return (
    <section>

      {/* Header */}

      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-500/20">

          <Info className="h-7 w-7 text-orange-500" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

            Activity Information

          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

            Important details before starting this activity.

          </p>

        </div>

      </div>

      {/* Cards */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              margin: "-40px",
            }}
            transition={{
              duration: 0.25,
              delay: index * 0.04,
            }}
            whileHover={{
              y: -4,
            }}
          >
            <Card className="group h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-orange-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">

              <CardContent className="p-6">

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 transition-colors group-hover:bg-orange-500 dark:bg-orange-500/20">

                  <card.icon className="h-7 w-7 text-orange-500 group-hover:text-white" />

                </div>

                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">

                  {card.title}

                </h3>

                <p className="mt-3 break-words text-sm leading-6 text-slate-600 dark:text-slate-400">

                  {card.value}

                </p>

              </CardContent>

            </Card>
          </motion.div>
        ))}

      </div>

    </section>
  );
};

export default ActivityInfoCards;