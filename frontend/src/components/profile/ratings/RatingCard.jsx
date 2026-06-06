// ── RatingCard.jsx ───────────────────────────────────────────────────────────
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CalendarDays, MapPin } from "lucide-react";

export const RatingCard = ({ rating }) => {
  const destination = rating?.destination;
  const stars = rating?.rating || 0;

  return (
    <Card className="group overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
              {destination?.name}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-sm text-gray-400">
              <MapPin className="h-3.5 w-3.5 text-orange-400" />
              {destination?.city}, {destination?.state}
            </div>
          </div>
          <Badge className="border-0 bg-orange-50 text-orange-600 hover:bg-orange-50 text-xs">
            {destination?.category}
          </Badge>
        </div>

        {/* Stars */}
        <div className="mt-4 flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 transition-colors ${
                i < stars ? "fill-amber-400 text-amber-400" : "text-gray-200"
              }`}
            />
          ))}
          <span className="ml-2 text-sm font-semibold text-gray-700">{stars}/5</span>
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
          <CalendarDays className="h-3.5 w-3.5" />
          Rated on {new Date(rating?.createdAt).toLocaleDateString("en-IN", {
            day: "numeric", month: "short", year: "numeric",
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingCard;
