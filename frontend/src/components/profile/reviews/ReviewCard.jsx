import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  CalendarDays,
  MapPin,
} from "lucide-react";

const ReviewCard = ({ review }) => {
  const destination = review?.destination;
  const rating = review?.rating || 0;

  return (
    <Card
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        bg-card
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-lg
      "
    >
      <CardContent className="p-4">

        {/* ================= Header ================= */}

        <div className="flex items-start justify-between gap-3">

          <div>

            <h3
              className="
                text-sm
                font-bold
                text-foreground
                transition-colors
                group-hover:text-orange-500
              "
            >
              {destination?.name}
            </h3>

            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">

              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-100 dark:bg-orange-500/20">

                <MapPin className="h-3.5 w-3.5 text-orange-500" />

              </div>

              <span>
                {destination?.city}, {destination?.state}
              </span>

            </div>

          </div>

          <Badge
            className="
              rounded-full
              border-0
              bg-orange-100
              px-2.5
              py-0.5
              text-xs
              text-orange-600
              dark:bg-orange-500/20
              dark:text-orange-300
            "
          >
            {destination?.category}
          </Badge>

        </div>

        {/* ================= Rating ================= */}

        <div className="mt-4 rounded-xl bg-muted/40 p-3">

          <div className="flex items-center gap-1">

            {Array.from({ length: 5 }).map((_, index) => (

              <Star
                key={index}
                className={`h-4 w-4 transition-all ${
                  index < rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/30"
                }`}
              />

            ))}

            <span className="ml-2 text-sm font-bold text-foreground">
              {rating}
            </span>

            <span className="text-xs text-muted-foreground">
              / 5
            </span>

          </div>

        </div>

        {/* ================= Review ================= */}

        <div className="mt-4 rounded-xl border bg-muted/20 p-3">

          <p className="text-xs leading-6 text-muted-foreground">
            {review?.message}
          </p>

        </div>

        {/* ================= Footer ================= */}

        <div className="mt-3.5 flex items-center gap-2.5 text-xs text-muted-foreground">

          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-500/20">

            <CalendarDays className="h-3.5 w-3.5 text-blue-500" />

          </div>

          <span>
            Reviewed on{" "}
            {new Date(review?.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>

        </div>

      </CardContent>
    </Card>
  );
};

export default ReviewCard;