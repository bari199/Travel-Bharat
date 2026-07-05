import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Inbox, Loader2, ThumbsUp, Heart, Laugh, Frown, Angry } from "lucide-react";
import { getReactions, deleteReaction } from "../../../services/reactionApi";

/* ── Reaction type → icon/color mapping ─────────────────────
   Falls back to a neutral badge for any unrecognized type so
   new reaction types never break the table. ── */
const TYPE_STYLES = {
  like: { icon: ThumbsUp, className: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400" },
  love: { icon: Heart, className: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400" },
  haha: { icon: Laugh, className: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" },
  sad: { icon: Frown, className: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400" },
  angry: { icon: Angry, className: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400" },
};

const ReactionBadge = ({ type }) => {
  const style = TYPE_STYLES[type?.toLowerCase()] || {
    icon: ThumbsUp,
    className: "bg-slate-50 text-slate-600 dark:bg-stone-800 dark:text-stone-300",
  };
  const Icon = style.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${style.className}`}
    >
      <Icon size={12} />
      {type || "unknown"}
    </span>
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
const ReactionTable = () => {
  const [reactions, setReactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchReactions();
  }, []);

  const fetchReactions = async () => {
    try {
      setLoading(true);
      const res = await getReactions();
      setReactions(res.reactions || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load reactions");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this reaction?")) return;

    try {
      setDeletingId(id);
      await deleteReaction(id);
      toast.success("Reaction deleted");
      fetchReactions();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
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
                Comment
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-stone-400">
                Type
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
            ) : reactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-14">
                  <div className="flex flex-col items-center justify-center text-center gap-2">
                    <span className="w-10 h-10 rounded-full bg-slate-50 dark:bg-stone-800 flex items-center justify-center">
                      <Inbox size={18} className="text-slate-300 dark:text-stone-600" />
                    </span>
                    <p className="text-sm font-medium text-slate-500 dark:text-stone-400">
                      No reactions yet
                    </p>
                    <p className="text-xs text-slate-400 dark:text-stone-500">
                      Reactions left by users on comments will show up here
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              reactions.map((reaction) => (
                <tr
                  key={reaction._id}
                  className="border-b border-slate-100 dark:border-stone-800 last:border-0 hover:bg-slate-50/60 dark:hover:bg-stone-800/40 transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {(reaction.user?.username?.[0] || "?").toUpperCase()}
                      </span>
                      <span className="text-slate-700 dark:text-stone-200 font-medium truncate">
                        {reaction.user?.username || "Unknown user"}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 max-w-xs">
                    <span className="text-slate-600 dark:text-stone-300 truncate block">
                      {reaction.comment?.message || "—"}
                    </span>
                  </td>

                  <td className="px-4 py-3.5">
                    <ReactionBadge type={reaction.type} />
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="text-slate-500 dark:text-stone-400">
                      {new Date(reaction.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => handleDelete(reaction._id)}
                      disabled={deletingId === reaction._id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === reaction._id ? (
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

export default ReactionTable;