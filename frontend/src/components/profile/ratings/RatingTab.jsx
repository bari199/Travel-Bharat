// ── RatingsTab.jsx ───────────────────────────────────────────────────────────

import { Card, CardContent } from "@/components/ui/card";
import RatingCard from "@/components/profile/ratings/RatingCard";

import {
  Star,
  Sparkles,
} from "lucide-react";

export const RatingsTab = ({
  ratings = [],
}) => {

  // ================= Empty State =================

  if (!ratings.length) {

    return (

      <Card className="rounded-3xl border border-dashed bg-card shadow-sm">

        <CardContent className="flex flex-col items-center justify-center py-24 text-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-500/20 dark:to-orange-500/20">

            <Star className="h-10 w-10 text-amber-500" />

          </div>

          <h2 className="mt-6 text-2xl font-bold text-foreground">

            No Ratings Yet

          </h2>

          <p className="mt-3 max-w-md leading-7 text-muted-foreground">

            You haven't rated any destinations yet.
            Explore amazing places and share your
            ratings to help other travellers.

          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600 dark:bg-orange-500/20 dark:text-orange-300">

            <Sparkles className="h-4 w-4" />

            Start Rating Destinations

          </div>

        </CardContent>

      </Card>

    );

  }

  // ================= Ratings =================

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border bg-card p-6 shadow-sm">

        <div>

          <h2 className="text-xl font-bold text-foreground">

            My Ratings

          </h2>

          <p className="mt-1 text-sm text-muted-foreground">

            All the places you've rated.

          </p>

        </div>

        <div className="flex h-12 items-center justify-center rounded-2xl bg-amber-100 px-5 text-lg font-bold text-amber-600 dark:bg-amber-500/20 dark:text-amber-300">

          {ratings.length}

        </div>

      </div>

      {/* Grid */}

      <div className="grid gap-6 md:grid-cols-2">

        {ratings.map((rating) => (

          <RatingCard
            key={rating._id}
            rating={rating}
          />

        ))}

      </div>

    </div>

  );
};

export default RatingsTab;