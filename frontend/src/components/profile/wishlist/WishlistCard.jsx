import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Heart,
  Trash2,
} from "lucide-react";

export const WishlistCard = ({ item, onRemove }) => {

  let title = "";
  let image = "";
  let location = "";
  let description = "";
  let category = "";

  // ================= Destination =================

  if (item.type === "destination" && item.destination) {

    title = item.destination.name || "";

    image =
      item.destination.images?.[0]?.url ||
      item.destination.images?.[0] ||
      "https://placehold.co/600x400/f97316/ffffff?text=Destination";

    location = `${item.destination.city || ""}${
      item.destination.state
        ? ", " + item.destination.state
        : ""
    }`;

    description =
      item.destination.shortDescription || "";

    category =
      item.destination.category ||
      "Destination";
  }

  // ================= Experience =================

  else if (
    item.type === "experience" &&
    item.experience
  ) {

    title = item.experience.title || "";

    image =
      item.experience.images?.[0]?.url ||
      item.experience.images?.[0] ||
      item.experience.destination?.images?.[0]?.url ||
      item.experience.destination?.images?.[0] ||
      "https://placehold.co/600x400/f97316/ffffff?text=Experience";

    location =
      item.experience.location || "";

    description =
      item.experience.shortDescription || "";

    category = "Experience";
  }

  // ================= Activity =================

  else if (
    item.type === "activity" &&
    item.activity
  ) {

    title = item.activity.title || "";

    image =
      item.activity.images?.[0]?.url ||
      item.activity.images?.[0] ||
      item.activity.destination?.images?.[0]?.url ||
      item.activity.destination?.images?.[0] ||
      "https://placehold.co/600x400/f97316/ffffff?text=Activity";

    location =
      item.activity.location || "";

    description =
      item.activity.shortDescription || "";

    category = "Activity";
  }

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
      hover:-translate-y-1
      hover:shadow-lg
    "
    >

      {/* Image */}

      <div className="relative aspect-[16/10] overflow-hidden">

        <img
          src={image}
          alt={title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Favourite */}

        <div className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur">

          <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />

        </div>

        {/* Category */}

        <Badge
          className="
            absolute
            bottom-2.5
            left-2.5
            rounded-full
            border-0
            bg-white/90
            px-2.5
            py-0.5
            text-xs
            text-gray-700
            backdrop-blur
          "
        >
          {category}
        </Badge>

      </div>

      <CardContent className="p-4">

        {/* Title */}

        <h3
          className="
          truncate
          text-sm
          font-bold
          text-foreground
          transition-colors
          group-hover:text-orange-500
        "
        >
          {title}
        </h3>

        {/* Location */}

        {location && (

          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">

            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-orange-100 dark:bg-orange-500/20">

              <MapPin className="h-3.5 w-3.5 text-orange-500" />

            </div>

            <span className="truncate">

              {location}

            </span>

          </div>

        )}

        {/* Description */}

        <p className="mt-2.5 line-clamp-2 text-xs leading-5 text-muted-foreground">

          {description}

        </p>

        {/* Remove Button */}

        <Button
          onClick={() => onRemove(item)}
          size="sm"
          className="
            mt-4
            h-9
            w-full
            rounded-xl
            bg-rose-50
            text-xs
            text-rose-600
            transition-all
            duration-300
            hover:bg-rose-500
            hover:text-white
            dark:bg-rose-500/10
            dark:hover:bg-rose-500
          "
        >

          <Trash2 className="mr-1.5 h-3.5 w-3.5" />

          Remove from Wishlist

        </Button>

      </CardContent>

    </Card>

  );
};

export default WishlistCard;