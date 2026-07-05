import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { features } from "../../data/data";

import WhyChooseSkeleton from "../Skeletons/WhyChooseSkeleton";

/* Lightweight, GPU-friendly variants — opacity + small translate only,
   no blur/scale combos, short durations to avoid jank on lower-end devices */

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const WhyChoose = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <WhyChooseSkeleton />;
  }

  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-16 bg-orange-200/90">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-2xl mb-12 sm:mb-14"
        >
          <span className="inline-block text-orange-600 font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            Why TravelBharat
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Built for travellers who want it done right
          </h2>

          <p className="text-gray-700 text-sm sm:text-base mt-3 leading-relaxed">
            From verified stays to real-time support, every trip booked on
            TravelBharat is backed by a team that knows India — so you can
            focus on the journey, not the logistics.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                variants={item}
                className="group relative bg-white/60 hover:bg-white rounded-2xl p-5 sm:p-6 border border-white/40 hover:border-orange-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 will-change-transform"
              >

                {/* Icon */}
                <div className="mb-4 sm:mb-5 inline-flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-orange-100 group-hover:bg-orange-500 transition-colors duration-300">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-orange-500 group-hover:text-white stroke-[1.5] transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-6">
                  {feature.description}
                </p>

              </motion.div>
            );
          })}

        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;