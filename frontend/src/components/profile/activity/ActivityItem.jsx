// ── ActivityItem.jsx ────────────────────────────────────────────────────────
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageSquare, Star, Clock3 } from "lucide-react";

const iconMap = {
  wishlist: {
    Icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-500/20",
  },
  review: {
    Icon: MessageSquare,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/20",
  },
  rating: {
    Icon: Star,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-500/20",
  },
};

export const ActivityItem = ({ activity }) => {
  const { Icon, color, bg } = iconMap[activity.type] ?? {
    Icon: Clock3,
    color: "text-muted-foreground",
    bg: "bg-muted",
  };

  return (
    <Card className="overflow-hidden rounded-2xl border shadow-sm transition-all duration-200 hover:shadow-md">
      <CardContent className="flex items-start gap-4 p-5">
        {/* Icon pill */}
        <div
          className={`mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${bg}`}
        >
          <Icon className={`h-4.5 w-4.5 ${color}`} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-snug text-foreground">
            {activity.title}
          </p>

          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {activity.description}
          </p>

          <p className="mt-3 text-xs text-muted-foreground">
            {new Date(activity.createdAt).toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityItem;