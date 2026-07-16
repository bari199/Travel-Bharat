import React, { useEffect, useState } from "react";

import api from "@/lib/api";

import { Button } from "@/components/ui/button";
import ActivityCard from "@/components/ActivityListing/ActivityCard";

const RelatedActivities = ({ activity }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const fetchActivities = async () => {
      try {
        const res = await api.get("/activities");

        if (cancelled) return;

        const filtered = res.data.activities
          ?.filter(
            (item) =>
              item._id !== activity._id &&
              (item.category === activity.category ||
                item.destination?._id === activity.destination?._id)
          )
          .slice(0, 3);

        setActivities(filtered);
      } catch (error) {
        console.log(error);
      }
    };

    fetchActivities();

    return () => {
      cancelled = true;
    };
  }, [activity]);


  if (!activities.length) return null;


  return (
    <section className="dark:bg-slate-900">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl sm:text-2xl font-bold">
          Related Activities
        </h2>


        <Button
          variant="link"
          className="
            text-orange-500 
            hover:text-orange-600 
            px-0 
            text-sm
          "
        >
          Explore More
        </Button>

      </div>


      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">

        {activities.map((activity) => (
          <ActivityCard 
            key={activity._id} 
            activity={activity} 
          />
        ))}

      </div>

    </section>
  );
};

export default RelatedActivities;