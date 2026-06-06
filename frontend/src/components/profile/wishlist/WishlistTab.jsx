// ── WishlistTab.jsx ─────────────────────────────────────────────────────────
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

export const WishlistTab = ({ wishlist = [], onRemoveWishlist }) => {
  if (!wishlist.length) {
    return (
      <Card className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 shadow-none">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50">
            <Heart className="h-7 w-7 text-rose-400" />
          </div>
          <h3 className="text-base font-bold text-gray-700">No Wishlist Yet</h3>
          <p className="mt-1.5 max-w-xs text-sm text-gray-400">
            Start saving destinations you want to visit and they'll appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {wishlist.map((item) => (
        <WishlistCard key={item._id} item={item} onRemove={onRemoveWishlist} />
      ))}
    </div>
  );
};

export default WishlistTab;
