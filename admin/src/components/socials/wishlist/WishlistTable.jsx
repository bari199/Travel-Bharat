import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Inbox, Loader2, Heart } from "lucide-react";
import { getWishlist, deleteWishlist } from "../../../services/wishlistApi";

/* ── Loading skeleton row ────────────────────────────────── */
const SkeletonRow = () => (
  <tr className="border-b border-slate-100 dark:border-stone-800">
    {Array.from({ length: 4 }).map((_, i) => (
      <td key={i} className="px-4 py-3.5">
        <div className="h-4 rounded bg-slate-100 dark:bg-stone-800 animate-pulse" />
      </td>
    ))}
  </tr>
);

/* ════════════════════════════════════════════════════════════ */
const WishlistTable = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await getWishlist();
      setWishlist(res.wishlist || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete wishlist item?")) return;

    try {
      setDeletingId(id);
      await deleteWishlist(id);
      toast.success("Wishlist removed");
      fetchWishlist();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to remove item");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900 border border-slate-100 dark:border-stone-800 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-stone-800 bg-slate-50/60 dark:bg-stone-800/60">
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-stone-400">
                User
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-stone-400">
                Destination
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-stone-400">
                Added
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-stone-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : wishlist.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-14">
                  <div className="flex flex-col items-center justify-center text-center gap-2">
                    <span className="w-10 h-10 rounded-full bg-slate-50 dark:bg-stone-800 flex items-center justify-center">
                      <Inbox size={18} className="text-slate-300 dark:text-stone-600" />
                    </span>
                    <p className="text-sm font-medium text-slate-500 dark:text-stone-400">
                      No wishlist items yet
                    </p>
                    <p className="text-xs text-slate-400 dark:text-stone-500">
                      Destinations users save will show up here
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              wishlist.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-slate-100 dark:border-stone-800 last:border-0 hover:bg-slate-50/60 dark:hover:bg-stone-800/40 transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {(item.user?.username?.[0] || "?").toUpperCase()}
                      </span>
                      <span className="text-slate-700 dark:text-stone-200 font-medium truncate">
                        {item.user?.username || "Unknown user"}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Heart size={13} className="fill-rose-400 text-rose-400 shrink-0" />
                      <span className="text-slate-600 dark:text-stone-300">
                        {item.destination?.name || "Unknown destination"}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="text-slate-500 dark:text-stone-400">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === item._id ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : (
                        <Trash2 size={13} />
                      )}
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishlistTable;