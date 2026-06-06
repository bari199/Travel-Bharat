// ── WishlistCard.jsx ─────────────────────────────────────────────────────────
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Heart, Trash2 } from "lucide-react";

export const WishlistCard = ({ item, onRemove }) => {
  const destination = item?.destination;

  return (
    <Card className="group overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={destination?.images?.[0] || "https://placehold.co/600x400/f97316/ffffff?text=Destination"}
          alt={destination?.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Heart badge */}
        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm">
          <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
        </div>
        {/* Category pill */}
        <div className="absolute bottom-3 left-3">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 backdrop-blur-sm shadow-sm">
            {destination?.category}
          </span>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors leading-tight">
          {destination?.name}
        </h3>

        <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
          <MapPin className="h-3.5 w-3.5 text-orange-400" />
          {destination?.city}, {destination?.state}
        </div>

        <p className="mt-2.5 line-clamp-2 text-sm text-gray-500 leading-relaxed">
          {destination?.shortDescription}
        </p>

        <div className="mt-4">
          <Button
            size="sm"
            variant="destructive"
            className="w-full rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white border-0 transition-all duration-200"
            onClick={() => onRemove(item._id)}
          >
            <Trash2 className="mr-1.5 h-3.5 w-3.5" />
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WishlistCard;
