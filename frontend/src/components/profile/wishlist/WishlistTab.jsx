import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles } from "lucide-react";

import WishlistCard from "@/components/profile/wishlist/WishlistCard";

export const WishlistTab = ({
  wishlist = {
    destinations: [],
    experiences: [],
    activities: [],
  },
  onRemoveWishlist,
}) => {
  // ================= Merge Wishlist =================

  const allWishlist = [
    ...wishlist.destinations.map((item) => ({
      ...item,
      type: "destination",
    })),

    ...wishlist.experiences.map((item) => ({
      ...item,
      type: "experience",
    })),

    ...wishlist.activities.map((item) => ({
      ...item,
      type: "activity",
    })),
  ];

  // ================= Empty =================

  if (!allWishlist.length) {
    return (
      <Card className="rounded-3xl border border-dashed bg-card shadow-sm">

        <CardContent className="flex flex-col items-center justify-center py-24 text-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-orange-100 dark:from-rose-500/20 dark:to-orange-500/20">

            <Heart className="h-10 w-10 text-rose-500" />

          </div>

          <h2 className="mt-6 text-2xl font-bold text-foreground">

            Your Wishlist is Empty

          </h2>

          <p className="mt-3 max-w-md text-muted-foreground leading-7">

            Start exploring amazing destinations,
            experiences and activities. Save your
            favourites here and access them anytime.

          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600 dark:bg-orange-500/20 dark:text-orange-300">

            <Sparkles className="h-4 w-4" />

            Start adding your favourites

          </div>

        </CardContent>

      </Card>
    );
  }

  // ================= Wishlist =================

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border bg-card p-6 shadow-sm">

        <div>

          <h2 className="text-xl font-bold text-foreground">

            My Wishlist

          </h2>

          <p className="mt-1 text-sm text-muted-foreground">

            Your saved destinations, experiences and
            activities.

          </p>

        </div>

        <div className="flex h-12 items-center justify-center rounded-2xl bg-orange-100 px-5 text-lg font-bold text-orange-600 dark:bg-orange-500/20 dark:text-orange-300">

          {allWishlist.length}

        </div>

      </div>

      {/* Grid */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {allWishlist.map((item) => (

          <WishlistCard
            key={`${item.type}-${item._id}`}
            item={item}
            onRemove={onRemoveWishlist}
          />

        ))}

      </div>

    </div>
  );
};

export default WishlistTab;