import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  AlertTriangle,
  MessageSquareOff,
  Star,
  Calendar,
  MapPin,
} from "lucide-react";

/* ── Avatar initials + color (same system as UserTable) ─────── */
const AVATAR_COLORS = [
  "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
  "bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
  "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  "bg-rose-100 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400",
  "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
  "bg-teal-100 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400",
];
const avatarColor = (str = "") =>
  AVATAR_COLORS[str.charCodeAt(0) % AVATAR_COLORS.length] || AVATAR_COLORS[0];

const initials = (name = "") => name.slice(0, 2).toUpperCase() || "?";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

/* ── Rating stars ─────────────────────────────────────────── */
const RatingStars = ({ rating = 0 }) => (
  <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={13}
        className={
          i < rating
            ? "fill-amber-400 text-amber-400"
            : "text-slate-200 dark:text-stone-700"
        }
      />
    ))}
  </div>
);

/* ── Empty state ──────────────────────────────────────────── */
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center gap-3 py-16 text-center"
  >
    <span className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-stone-800 flex items-center justify-center">
      <MessageSquareOff size={24} className="text-slate-400 dark:text-stone-500" />
    </span>
    <p className="text-sm font-semibold text-slate-600 dark:text-stone-300">
      No comments found
    </p>
    <p className="text-xs text-slate-400 dark:text-stone-500">
      Comments will appear here once users start reviewing.
    </p>
  </motion.div>
);

/* ── Delete confirmation (shared by desktop + mobile) ────────── */
const DeleteCommentButton = ({ comment, onConfirm, compact = false }) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
        <Button
          size="sm"
          variant="outline"
          className={`h-8 ${compact ? "px-2.5" : "px-3"} text-xs font-semibold border-rose-100 dark:border-rose-500/20 text-rose-500 dark:text-rose-400
            hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-300 hover:border-rose-200 dark:hover:border-rose-500/30 gap-1.5`}
        >
          <Trash2 size={12} />
          {!compact && "Delete"}
        </Button>
      </motion.div>
    </AlertDialogTrigger>

    <AlertDialogContent className="rounded-2xl border-slate-100 dark:border-stone-800 dark:bg-stone-900 shadow-xl max-w-md">
      <AlertDialogHeader>
        <div className="flex items-center gap-3 mb-1">
          <span className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-rose-500 dark:text-rose-400" />
          </span>
          <AlertDialogTitle className="text-base font-bold text-slate-800 dark:text-stone-100">
            Delete comment?
          </AlertDialogTitle>
        </div>
        <AlertDialogDescription className="text-sm text-slate-500 dark:text-stone-400 leading-relaxed pl-[52px]">
          This will permanently remove{" "}
          <span className="font-semibold text-slate-700 dark:text-stone-200">
            "{comment.user?.username || "this user"}"
          </span>
          's comment on{" "}
          <span className="font-semibold text-slate-700 dark:text-stone-200">
            {comment.destination?.name || "this destination"}
          </span>
          . This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter className="gap-2 mt-2">
        <AlertDialogCancel className="rounded-xl border-slate-200 dark:border-stone-700 text-slate-600 dark:text-stone-300
          hover:bg-slate-50 dark:hover:bg-stone-800 text-sm font-medium">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className="rounded-xl bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 text-white text-sm font-semibold gap-1.5"
        >
          <Trash2 size={13} />
          Yes, delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

/* ════════════════════════════════════════════════════════════ */
const CommentTable = ({ comments, onDelete }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = (id) => {
    setDeletingId(id);
    onDelete(id);
  };

  const isEmpty = !comments || comments.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-white dark:bg-stone-900 border border-slate-100 dark:border-stone-800 rounded-2xl shadow-sm overflow-hidden"
    >
      {/* ── Desktop / tablet: table ──────────────────────────── */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/70 dark:bg-stone-800/60 border-slate-100 dark:border-stone-800 hover:bg-slate-50/70 dark:hover:bg-stone-800/60">
              {["User", "Destination", "Rating", "Comment", "Date", "Action"].map((h) => (
                <TableHead
                  key={h}
                  className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-stone-500 py-3.5 first:pl-5"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isEmpty && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6}>
                  <EmptyState />
                </TableCell>
              </TableRow>
            )}

            <AnimatePresence initial={false}>
              {!isEmpty &&
                comments.map((comment, i) => (
                  <motion.tr
                    key={comment._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -24, transition: { duration: 0.2 } }}
                    transition={{ delay: i * 0.04, duration: 0.28, ease: "easeOut" }}
                    className={`border-slate-50 dark:border-stone-800 transition-colors hover:bg-slate-50/60 dark:hover:bg-stone-800/40 group
                      ${deletingId === comment._id ? "opacity-40 pointer-events-none" : ""}`}
                  >
                    {/* User */}
                    <TableCell className="pl-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${avatarColor(
                            comment.user?.username,
                          )}`}
                        >
                          {initials(comment.user?.username)}
                        </div>
                        <span className="text-sm font-semibold text-slate-800 dark:text-stone-100 truncate max-w-[120px]">
                          {comment.user?.username || "Unknown"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Destination */}
                    <TableCell className="text-sm text-slate-600 dark:text-stone-300 max-w-[160px]">
                      <span className="inline-flex items-center gap-1.5 truncate">
                        <MapPin size={12} className="text-slate-400 dark:text-stone-500 shrink-0" />
                        <span className="truncate">{comment.destination?.name || "—"}</span>
                      </span>
                    </TableCell>

                    {/* Rating */}
                    <TableCell>
                      <RatingStars rating={comment.rating} />
                    </TableCell>

                    {/* Comment */}
                    <TableCell className="max-w-[280px]">
                      <p
                        className="text-sm text-slate-600 dark:text-stone-300 line-clamp-2"
                        title={comment.message}
                      >
                        {comment.message}
                      </p>
                    </TableCell>

                    {/* Date */}
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-stone-500 whitespace-nowrap">
                        <Calendar size={12} className="shrink-0" />
                        {formatDate(comment.createdAt)}
                      </div>
                    </TableCell>

                    {/* Action */}
                    <TableCell>
                      <DeleteCommentButton
                        comment={comment}
                        onConfirm={() => handleDelete(comment._id)}
                      />
                    </TableCell>
                  </motion.tr>
                ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {/* ── Mobile: stacked cards ────────────────────────────── */}
      <div className="md:hidden divide-y divide-slate-100 dark:divide-stone-800">
        {isEmpty && <EmptyState />}

        <AnimatePresence initial={false}>
          {!isEmpty &&
            comments.map((comment, i) => (
              <motion.div
                key={comment._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -24, transition: { duration: 0.2 } }}
                transition={{ delay: i * 0.04, duration: 0.28, ease: "easeOut" }}
                className={`p-4 space-y-3 ${deletingId === comment._id ? "opacity-40 pointer-events-none" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${avatarColor(
                        comment.user?.username,
                      )}`}
                    >
                      {initials(comment.user?.username)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-stone-100 truncate">
                        {comment.user?.username || "Unknown"}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-slate-400 dark:text-stone-500 truncate">
                        <MapPin size={11} className="shrink-0" />
                        {comment.destination?.name || "—"}
                      </p>
                    </div>
                  </div>
                  <RatingStars rating={comment.rating} />
                </div>

                <p className="text-sm text-slate-600 dark:text-stone-300 leading-relaxed">
                  {comment.message}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-stone-500">
                    <Calendar size={12} />
                    {formatDate(comment.createdAt)}
                  </div>
                  <DeleteCommentButton
                    comment={comment}
                    onConfirm={() => handleDelete(comment._id)}
                    compact
                  />
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CommentTable;