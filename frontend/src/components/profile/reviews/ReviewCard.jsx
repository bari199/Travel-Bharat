import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CalendarDays, MapPin } from "lucide-react";

const ReviewCard = ({ review }) => {
  const destination = review?.destination;

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">
              {destination?.name}
            </h3>

            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {destination?.city}, {destination?.state}
            </div>
          </div>

          <Badge variant="secondary">
            {destination?.category}
          </Badge>
        </div>

        <div className="mt-4 flex items-center gap-1">
          {Array.from({ length: review?.rating || 0 }).map((_, index) => (
            <Star
              key={index}
              className="h-4 w-4 fill-yellow-500 text-yellow-500"
            />
          ))}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {review?.message}
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          {new Date(review?.createdAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;