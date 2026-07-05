import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Star, Trash2, Inbox, Loader2 } from "lucide-react";
import { getRatings, deleteRating } from "../../../services/ratingApi";

/* ── Star rating display ─────────────────────────────────── */
const StarRating = ({ value = 0 }) => {
  const rounded = Math.round(value);
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={14}
            className={
              n <= rounded
                ? "fill-amber-400 text-amber-400"
                : "text-slate-200 dark:text-stone-700"
            }
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-slate-500 dark:text-stone-400 ml-1">
        {value ?? "—"}
      </span>
    </div>
  );
};

/* ── Loading skeleton row ────────────────────────────────── */
const SkeletonRow = () => (
  <tr className="border-b border-slate-100 dark:border-stone-800">
    {Array.from({ length: 5 }).map((_, i) => (
      <td key={i} className="px-4 py-3.5">
        <div className="h-4 rounded bg-slate-100 dark:bg-stone-800 animate-pulse" />
      </td>
    ))}
  </tr>
);

/* ════════════════════════════════════════════════════════════ */
const RatingTable = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const res = await getRatings();
      setRatings(res.ratings);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load ratings");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete rating?")) return;

    try {
      setDeletingId(id);
      await deleteRating(id);
      toast.success("Rating deleted");
      fetchRatings();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete rating");
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
                Rating
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-stone-400">
                Date
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-stone-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : ratings.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-14">
                  <div className="flex flex-col items-center justify-center text-center gap-2">
                    <span className="w-10 h-10 rounded-full bg-slate-50 dark:bg-stone-800 flex items-center justify-center">
                      <Inbox size={18} className="text-slate-300 dark:text-stone-600" />
                    </span>
                    <p className="text-sm font-medium text-slate-500 dark:text-stone-400">
                      No ratings yet
                    </p>
                    <p className="text-xs text-slate-400 dark:text-stone-500">
                      Ratings submitted by users will show up here
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              ratings.map((rating) => (
                <tr
                  key={rating._id}
                  className="border-b border-slate-100 dark:border-stone-800 last:border-0 hover:bg-slate-50/60 dark:hover:bg-stone-800/40 transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {(rating.user?.username?.[0] || "?").toUpperCase()}
                      </span>
                      <span className="text-slate-700 dark:text-stone-200 font-medium truncate">
                        {rating.user?.username || "Unknown user"}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="text-slate-600 dark:text-stone-300">
                      {rating.destination?.name || "Unknown destination"}
                    </span>
                  </td>

                  <td className="px-4 py-3.5">
                    <StarRating value={rating.rating} />
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="text-slate-500 dark:text-stone-400">
                      {new Date(rating.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => handleDelete(rating._id)}
                      disabled={deletingId === rating._id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === rating._id ? (
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

export default RatingTable;