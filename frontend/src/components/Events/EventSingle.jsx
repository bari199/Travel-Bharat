import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSingleEvent } from "@/services/EventApi";

import { Skeleton } from "@/components/ui/skeleton";

import EventHero from "./EventHero";
import EventOverview from "./EventOverview";
import EventInfoCards from "./EventInfoCards";
import EventGallery from "./EventGallery";
import EventLocation from "./EventLocation";
import EventOrganizer from "./EventOrganizer";
import EventSchedule from "./EventsSchedule";

import Footer from "../Home/Footer";

const EventSingle = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);

        const data = await getSingleEvent(id);

        setEvent(data.event || data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="w-full h-[500px]" />

        <div className="container mx-auto px-4 space-y-6 py-10">
          <Skeleton className="w-full h-40 rounded-xl" />
          <Skeleton className="w-full h-52 rounded-xl" />
          <Skeleton className="w-full h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Event Not Found
        </h2>

        <p className="text-gray-500">
          The event you are looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 min-h-screen">

      {/* Hero */}
      <EventHero event={event} />

      <div className="container mx-auto px-4 py-12">

        {/* Info Cards */}
        <div className="mb-8">
          <EventInfoCards event={event} />
        </div>

        {/* Overview */}
        <div className="mb-8">
          <EventOverview event={event} />
        </div>

        {/* Schedule */}
        <div className="mb-8">
          <EventSchedule event={event} />
        </div>

        {/* Organizer */}
        <div className="mb-8">
          <EventOrganizer event={event} />
        </div>

        {/* Location */}
        <div className="mb-8">
          <EventLocation event={event} />
        </div>

        {/* Gallery */}
        <div className="mb-8">
          <EventGallery event={event} />
        </div>

      </div>
        <Footer/>
    </div>
  );
};

export default EventSingle;