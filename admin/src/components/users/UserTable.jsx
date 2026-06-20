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
  ["bg-indigo-100 text-indigo-600"],
  ["bg-sky-100    text-sky-600"   ],
  ["bg-emerald-100 text-emerald-600"],
  ["bg-amber-100  text-amber-600" ],
  ["bg-rose-100   text-rose-500"  ],
  ["bg-purple-100 text-purple-600"],
  ["bg-teal-100   text-teal-600"  ],
];
const avatarColor = (str = "") =>
  AVATAR_COLORS[str.charCodeAt(0) % AVATAR_COLORS.length][0];

const initials = (name = "") =>
  name.slice(0, 2).toUpperCase() || "?";

/* ── Skeleton row ─────────────────────────────────────────── */
const SkeletonRow = ({ i }) => (
  <TableRow className="border-slate-50">
    {[44, 160, 120, 80, 72, 80, 72].map((w, j) => (
      <TableCell key={j}>
        <div
          className="h-4 rounded-lg bg-slate-100 animate-pulse"
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
      className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden"
    >
      <Table>
        {/* ── Header ── */}
        <TableHeader>
          <TableRow className="bg-slate-50/70 border-slate-100 hover:bg-slate-50/70">
            {["User", "Email", "Verified", "Status", "Joined", "Actions"].map((h) => (
              <TableHead
                key={h}
                className="text-xs font-semibold uppercase tracking-wide text-slate-400 py-3.5 first:pl-5"
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
                  <span className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <SearchX size={24} className="text-slate-400" />
                  </span>
                  <p className="text-sm font-semibold text-slate-600">No users found</p>
                  <p className="text-xs text-slate-400">Users will appear here once they sign up</p>
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
                className={`border-slate-50 transition-colors hover:bg-slate-50/60 group
                  ${deletingId === user._id ? "opacity-40 pointer-events-none" : ""}`}
              >
                {/* User — avatar + username */}
                <TableCell className="pl-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${avatarColor(user.username)}`}>
                      {initials(user.username)}
                    </div>
                    <span className="text-sm font-semibold text-slate-800 truncate max-w-[120px]">
                      {user.username}
                    </span>
                  </div>
                </TableCell>

                {/* Email */}
                <TableCell className="text-sm text-slate-500 max-w-[200px]">
                  <span className="truncate block">{user.email}</span>
                </TableCell>

                {/* Verified */}
                <TableCell>
                  {user.isVerified ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <ShieldCheck size={12} />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-50 text-slate-400 border border-slate-100">
                      <ShieldOff size={12} />
                      Unverified
                    </span>
                  )}
                </TableCell>

                {/* Online status */}
                <TableCell>
                  {user.isLoggedIn ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-sky-50 text-sky-600 border border-sky-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                      Online
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-50 text-slate-400 border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      Offline
                    </span>
                  )}
                </TableCell>

                {/* Joined date */}
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
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
                          className="h-8 px-3 text-xs font-semibold border-rose-100 text-rose-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 gap-1.5"
                        >
                          <Trash2 size={12} />
                          Delete
                        </Button>
                      </motion.div>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="rounded-2xl border-slate-100 shadow-xl max-w-md">
                      <AlertDialogHeader>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                            <AlertTriangle size={18} className="text-rose-500" />
                          </span>
                          <AlertDialogTitle className="text-base font-bold text-slate-800">
                            Delete user?
                          </AlertDialogTitle>
                        </div>
                        <AlertDialogDescription className="text-sm text-slate-500 leading-relaxed pl-[52px]">
                          This will permanently remove{" "}
                          <span className="font-semibold text-slate-700">"{user.username}"</span>{" "}
                          and all their associated data from the platform. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter className="gap-2 mt-2">
                        <AlertDialogCancel className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(user._id)}
                          className="rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold gap-1.5"
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