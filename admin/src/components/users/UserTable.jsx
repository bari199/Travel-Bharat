import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Trash2, AlertTriangle, SearchX,
  ShieldCheck, ShieldOff, Wifi, WifiOff, Calendar,
} from "lucide-react";

/* ── Avatar initials + color ─────────────────────────────── */
const AVATAR_COLORS = [
  ["bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"],
  ["bg-sky-100    text-sky-600    dark:bg-sky-500/10    dark:text-sky-400"   ],
  ["bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"],
  ["bg-amber-100  text-amber-600  dark:bg-amber-500/10  dark:text-amber-400" ],
  ["bg-rose-100   text-rose-500   dark:bg-rose-500/10   dark:text-rose-400"  ],
  ["bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400"],
  ["bg-teal-100   text-teal-600   dark:bg-teal-500/10   dark:text-teal-400"  ],
];
const avatarColor = (str = "") =>
  AVATAR_COLORS[str.charCodeAt(0) % AVATAR_COLORS.length][0];

const initials = (name = "") =>
  name.slice(0, 2).toUpperCase() || "?";

/* ── Skeleton row ─────────────────────────────────────────── */
const SkeletonRow = ({ i }) => (
  <TableRow className="border-slate-50 dark:border-stone-800">
    {[44, 160, 120, 80, 72, 80, 72].map((w, j) => (
      <TableCell key={j}>
        <div
          className="h-4 rounded-lg bg-slate-100 dark:bg-stone-800 animate-pulse"
          style={{ width: w, animationDelay: `${j * 55}ms` }}
        />
      </TableCell>
    ))}
  </TableRow>
);

/* ════════════════════════════════════════════════════════════ */
const UserTable = ({ users, onDelete, loading = false }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = (id) => {
    setDeletingId(id);
    onDelete(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-white dark:bg-stone-900 border border-slate-100 dark:border-stone-800 rounded-2xl shadow-sm overflow-hidden"
    >
      <Table>
        {/* ── Header ── */}
        <TableHeader>
          <TableRow className="bg-slate-50/70 dark:bg-stone-800/60 border-slate-100 dark:border-stone-800 hover:bg-slate-50/70 dark:hover:bg-stone-800/60">
            {["User", "Email", "Verified", "Status", "Joined", "Actions"].map((h) => (
              <TableHead
                key={h}
                className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-stone-500 py-3.5 first:pl-5"
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* ── Body ── */}
        <TableBody>
          {/* Loading skeletons */}
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <SkeletonRow key={i} i={i} />
          ))}

          {/* Empty state */}
          {!loading && (!users || users.length === 0) && (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={6} className="py-20 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-3"
                >
                  <span className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-stone-800 flex items-center justify-center">
                    <SearchX size={24} className="text-slate-400 dark:text-stone-500" />
                  </span>
                  <p className="text-sm font-semibold text-slate-600 dark:text-stone-300">No users found</p>
                  <p className="text-xs text-slate-400 dark:text-stone-500">Users will appear here once they sign up</p>
                </motion.div>
              </TableCell>
            </TableRow>
          )}

          {/* Data rows */}
          <AnimatePresence initial={false}>
            {!loading && users?.map((user, i) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -24, transition: { duration: 0.2 } }}
                transition={{ delay: i * 0.04, duration: 0.28, ease: "easeOut" }}
                className={`border-slate-50 dark:border-stone-800 transition-colors hover:bg-slate-50/60 dark:hover:bg-stone-800/40 group
                  ${deletingId === user._id ? "opacity-40 pointer-events-none" : ""}`}
              >
                {/* User — avatar + username */}
                <TableCell className="pl-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${avatarColor(user.username)}`}>
                      {initials(user.username)}
                    </div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-stone-100 truncate max-w-[120px]">
                      {user.username}
                    </span>
                  </div>
                </TableCell>

                {/* Email */}
                <TableCell className="text-sm text-slate-500 dark:text-stone-400 max-w-[200px]">
                  <span className="truncate block">{user.email}</span>
                </TableCell>

                {/* Verified */}
                <TableCell>
                  {user.isVerified ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                      <ShieldCheck size={12} />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-stone-800 text-slate-400 dark:text-stone-500 border border-slate-100 dark:border-stone-700">
                      <ShieldOff size={12} />
                      Unverified
                    </span>
                  )}
                </TableCell>

                {/* Online status */}
                <TableCell>
                  {user.isLoggedIn ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                      Online
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-stone-800 text-slate-400 dark:text-stone-500 border border-slate-100 dark:border-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-stone-600" />
                      Offline
                    </span>
                  )}
                </TableCell>

                {/* Joined date */}
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-stone-500">
                    <Calendar size={12} className="shrink-0" />
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-block"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-3 text-xs font-semibold border-rose-100 dark:border-rose-500/20 text-rose-500 dark:text-rose-400
                            hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-300 hover:border-rose-200 dark:hover:border-rose-500/30 gap-1.5"
                        >
                          <Trash2 size={12} />
                          Delete
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
                            Delete user?
                          </AlertDialogTitle>
                        </div>
                        <AlertDialogDescription className="text-sm text-slate-500 dark:text-stone-400 leading-relaxed pl-[52px]">
                          This will permanently remove{" "}
                          <span className="font-semibold text-slate-700 dark:text-stone-200">"{user.username}"</span>{" "}
                          and all their associated data from the platform. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter className="gap-2 mt-2">
                        <AlertDialogCancel className="rounded-xl border-slate-200 dark:border-stone-700 text-slate-600 dark:text-stone-300
                          hover:bg-slate-50 dark:hover:bg-stone-800 text-sm font-medium">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(user._id)}
                          className="rounded-xl bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 text-white text-sm font-semibold gap-1.5"
                        >
                          <Trash2 size={13} />
                          Yes, delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default UserTable;