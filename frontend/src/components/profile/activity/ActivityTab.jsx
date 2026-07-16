// ── ActivityTab.jsx ────────────────────────────────────────────────────────

import { Card, CardContent } from "@/components/ui/card";
import ActivityItem from "@/components/profile/activity/ActivityItem";

import {
  Activity,
  Sparkles,
} from "lucide-react";

export const ActivityTab = ({
  activity = [],
}) => {

  // ================= Empty State =================

  if (!activity.length) {

    return (

      <Card className="rounded-3xl border border-dashed bg-card shadow-sm">

        <CardContent className="flex flex-col items-center justify-center py-24 text-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-500/20 dark:to-amber-500/20">

            <Activity className="h-10 w-10 text-orange-500" />

          </div>

          <h2 className="mt-6 text-2xl font-bold text-foreground">

            No Activity Yet

          </h2>

          <p className="mt-3 max-w-md leading-7 text-muted-foreground">

            Your recent actions including wishlists,
            reviews and ratings will appear here
            automatically.

          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600 dark:bg-orange-500/20 dark:text-orange-300">

            <Sparkles className="h-4 w-4" />

            Your activities will appear here

          </div>

        </CardContent>

      </Card>

    );

  }

  // ================= Activity List =================

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border bg-card p-6 shadow-sm">

        <div>

          <h2 className="text-xl font-bold text-foreground">

            Recent Activity

          </h2>

          <p className="mt-1 text-sm text-muted-foreground">

            Track your latest wishlist, review and
            rating activities.

          </p>

        </div>

        <div className="flex h-12 items-center justify-center rounded-2xl bg-orange-100 px-5 text-lg font-bold text-orange-600 dark:bg-orange-500/20 dark:text-orange-300">

          {activity.length}

        </div>

      </div>

      {/* Timeline */}

      <div className="space-y-4">

        {activity.map((item) => (

          <ActivityItem
            key={`${item.type}-${item._id}`}
            activity={item}
          />

        ))}

      </div>

    </div>

  );

};

export default ActivityTab;