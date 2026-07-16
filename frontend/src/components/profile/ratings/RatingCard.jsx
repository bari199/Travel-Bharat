import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  CalendarDays,
  MapPin,
} from "lucide-react";

export const RatingCard = ({ rating }) => {
  const destination = rating?.destination;
  const stars = rating?.rating || 0;

  return (
    <Card
      className="
      group
      overflow-hidden
      rounded-3xl
      border
      bg-card
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
    >
      <CardContent className="p-6">

        {/* Header */}

        <div className="flex items-start justify-between gap-4">

          <div>

            <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-orange-500">

              {destination?.name}

            </h3>

            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">

              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-500/20">

                <MapPin className="h-4 w-4 text-orange-500" />

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
            px-3
            py-1
            text-orange-600
            dark:bg-orange-500/20
            dark:text-orange-300
          "
          >
            {destination?.category}
          </Badge>

        </div>

        {/* Rating */}

        <div className="mt-6 rounded-2xl bg-muted/40 p-4">

          <div className="flex items-center gap-1">

            {Array.from({ length: 5 }).map((_, i) => (

              <Star
                key={i}
                className={`
                  h-6
                  w-6
                  transition-all

                  ${
                    i < stars
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30"
                  }
                `}
              />

            ))}

            <span className="ml-3 text-lg font-bold text-foreground">

              {stars}

            </span>

            <span className="text-sm text-muted-foreground">

              / 5

            </span>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-500/20">

            <CalendarDays className="h-4 w-4 text-blue-500" />

          </div>

          <span>

            Rated on{" "}
            {new Date(
              rating?.createdAt
            ).toLocaleDateString("en-IN", {
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

export default RatingCard;