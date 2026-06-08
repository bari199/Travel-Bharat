// ── ActivityTab.jsx ────────────────────────────────────────────────────────
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";
import ActivityItem from "@/components/profile/activity/ActivityItem";

export const ActivityTab = ({ activity = [] }) => {
  if (!activity.length) {
    return (
      <Card className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 shadow-none">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
            <Activity className="h-7 w-7 text-orange-400" />
          </div>
          <h3 className="text-base font-bold text-gray-700">No Activity Yet</h3>
          <p className="mt-1.5 max-w-xs text-sm text-gray-400">
            Your recent actions — wishlists, reviews, and ratings — will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {activity.map((item) => (
        <ActivityItem key={`${item.type}-${item._id}`} activity={item} />
      ))}
    </div>
  );
};

export default ActivityTab;
