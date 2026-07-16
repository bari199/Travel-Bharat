import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "@/lib/api";

import { Skeleton } from "@/components/ui/skeleton";

import ActivityHero from "@/components/Activity/ActivityHero";
import ActivityOverview from "@/components/Activity/ActivityOverview";
import ActivityInfoCards from "@/components/Activity/ActiveInfoCards";
import ActivityGallery from "@/components/Activity/ActivityGallery";
import ActivityThingsToCarry from "@/components/Activity/ActiveThingsToCarry";
import ActivityEquipment from "@/components/Activity/ActivityEquipment";
import ActivitySafety from "@/components/Activity/ActivitySafety";
import ActivityLocation from "@/components/Activity/ActivityLocation";
import RelatedActivities from "@/components/Activity/RelatedActivities";
import ActivityHighlights from "@/components/Activity/ActivityHighlights";

import Footer from "@/components/Home/Footer";
import { getActivityBySlug } from "@/services/Activityapi";

const Activity = () => {
  const { slug } = useParams();

  const [activity, setActivity] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleWishlist = async () => {
    try {
      const res = await api.post(`/activity-wishlist/${activity._id}`);

      setIsSaved(res.data.saved);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const fetchActivity = async () => {
  try {
    const res = await getActivityBySlug(slug);

    if (!cancelled) {
      setActivity(res.activity);
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (!cancelled) {
      setLoading(false);
    }
  }
};

    fetchActivity();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen dark:bg-slate-900">
        <Skeleton className="h-[60vh] sm:h-[70vh] w-full rounded-none" />
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
          <Skeleton className="h-40 w-full rounded-3xl" />
          <Skeleton className="h-64 w-full rounded-3xl" />
          <Skeleton className="h-64 w-full rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Activity not found
      </div>
    );
  }

  return (
    <>
      <ActivityHero
        activity={activity}
        isSaved={isSaved}
        onWishlist={handleWishlist}
      />

      <div className="max-w-7xl mx-auto px-4 py-10 dark:bg-slate-900">
        <div className="grid lg:grid-cols-[1fr_350px] gap-8 lg:gap-10">
          <div className="space-y-8 sm:space-y-10">
            <ActivityOverview activity={activity} />

            <ActivityHighlights activity={activity} />

            <ActivityInfoCards activity={activity} />

            <ActivityGallery activity={activity} />

            <ActivityThingsToCarry activity={activity} />

            <ActivityEquipment activity={activity} />

            <ActivitySafety activity={activity} />

            <ActivityLocation activity={activity} />

            <RelatedActivities activity={activity} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Activity;