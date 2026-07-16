import React from "react";
import {
  MapPin,
  Navigation,
  LocateFixed,
  MapPinned,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

const ActivityLocation = ({ activity }) => {
  return (
    <section>

      {/* Header */}

      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-500/20">

          <MapPinned className="h-7 w-7 text-orange-500" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

            Location & Meeting Point

          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

            Find the exact meeting point and activity location.

          </p>

        </div>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Left */}

        <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

          <CardContent className="space-y-5 p-6">

            {/* Location */}

            <div className="flex gap-4 rounded-2xl border border-orange-100 bg-orange-50 p-5 dark:border-orange-900/30 dark:bg-orange-950/20">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-500/20">

                <MapPin className="h-6 w-6 text-orange-500" />

              </div>

              <div>

                <h3 className="font-semibold text-slate-900 dark:text-white">

                  Activity Location

                </h3>

                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">

                  {activity.location}

                </p>

              </div>

            </div>

            {/* Meeting Point */}

            <div className="flex gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900/30 dark:bg-blue-950/20">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-500/20">

                <Navigation className="h-6 w-6 text-blue-500" />

              </div>

              <div>

                <h3 className="font-semibold text-slate-900 dark:text-white">

                  Meeting Point

                </h3>

                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">

                  {activity.meetingPoint}

                </p>

              </div>

            </div>

            {/* Destination */}

            <div className="flex gap-4 rounded-2xl border border-green-100 bg-green-50 p-5 dark:border-green-900/30 dark:bg-green-950/20">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 dark:bg-green-500/20">

                <LocateFixed className="h-6 w-6 text-green-500" />

              </div>

              <div>

                <h3 className="font-semibold text-slate-900 dark:text-white">

                  Destination

                </h3>

                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">

                  {activity.destination?.city},{" "}
                  {activity.destination?.state}

                </p>

              </div>

            </div>

          </CardContent>

        </Card>

        {/* Google Map */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

          <iframe
            title="location"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            className="min-h-[320px] w-full"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              activity.location
            )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          />

        </div>

      </div>

    </section>
  );
};

export default ActivityLocation;