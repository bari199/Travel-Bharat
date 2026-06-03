import React, { useEffect, useState } from "react";
import { features } from "../../data/data";

import WhyChooseSkeleton from "../Skeletons/WhyChooseSkeleton";

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
    <section className="w-full py-16 px-4 lg:px-16 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-slate-900 mb-12">
          Why choose TravelBharat?
        </h2>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index}>

                {/* Icon */}
                <div className="mb-5">
                  <Icon className="h-10 w-10 text-orange-500 stroke-[1.5]" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-[15px] leading-7">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default WhyChoose;