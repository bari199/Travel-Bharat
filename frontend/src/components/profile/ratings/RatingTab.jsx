// ── RatingsTab.jsx ───────────────────────────────────────────────────────────
import { Card, CardContent } from "@/components/ui/card";
import RatingCard from "@/components/profile/ratings/RatingCard";
import { Star } from "lucide-react";

export const RatingsTab = ({ ratings = [] }) => {
  if (!ratings.length) {
    return (
      <Card className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 shadow-none">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
            <Star className="h-7 w-7 text-amber-400" />
          </div>
          <h3 className="text-base font-bold text-gray-700">No Ratings Yet</h3>
          <p className="mt-1.5 max-w-xs text-sm text-gray-400">
            Your destination ratings will appear here once you start rating places.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {ratings.map((rating) => (
        <RatingCard key={rating._id} rating={rating} />
      ))}
    </div>
  );
};

export default RatingsTab;
