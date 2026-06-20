import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  Trash2,
  MapPin,
  Star,
  ImageOff,
  AlertTriangle,
  SearchX,
} from "lucide-react";

/* ── Category color map ─────────────────────────────────────── */
const CATEGORY_STYLES = {
  Beach: "bg-sky-50   text-sky-600   border-sky-100",
  Mountain: "bg-indigo-50 text-indigo-600 border-indigo-100",
  Heritage: "bg-amber-50  text-amber-600  border-amber-100",
  Forest: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Desert: "bg-orange-50 text-orange-600 border-orange-100",
  Wildlife: "bg-lime-50   text-lime-700   border-lime-100",
  Spiritual: "bg-purple-50 text-purple-600 border-purple-100",
  default: "bg-slate-50  text-slate-600  border-slate-100",
};

const categoryStyle = (cat) => CATEGORY_STYLES[cat] ?? CATEGORY_STYLES.default;

/* ── Row skeleton for loading state ─────────────────────────── */
const SkeletonRow = ({ i }) => (
  <TableRow className="border-slate-50">
    {[20, 36, 24, 28, 24, 20, 28].map((w, j) => (
      <TableCell key={j}>
        <div
          className="h-4 rounded-lg bg-slate-100 animate-pulse"
          style={{
            width: `${w * (i % 2 === 0 ? 1 : 0.75)}px`,
            animationDelay: `${j * 60}ms`,
          }}
        />
      </TableCell>
    ))}
  </TableRow>
);

/* ════════════════════════════════════════════════════════════ */
const DestinationTable = ({ destinations, onDelete, loading = false }) => {
  const navigate = useNavigate();
  const [imgErrors, setImgErrors] = useState({});
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
            {[
              "Image",
              "Destination",
              "Location",
              "Category",
              "Featured",
              "Actions",
            ].map((h) => (
              <TableHead
                key={h}
                className="text-xs font-semibold uppercase tracking-wide text-slate-400 py-3.5"
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* ── Body ── */}
        <TableBody>
          {/* Loading skeletons */}
          {loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} i={i} />
            ))}

          {/* Empty state */}
          {!loading && (!destinations || destinations.length === 0) && (
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
                  <p className="text-sm font-semibold text-slate-600">
                    No destinations found
                  </p>
                  <p className="text-xs text-slate-400">
                    Add a new destination to get started
                  </p>
                </motion.div>
              </TableCell>
            </TableRow>
          )}

          {/* Data rows */}
          <AnimatePresence initial={false}>
            {!loading &&
              destinations?.map((dest, i) => (
                <motion.tr
                  key={dest._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -24, transition: { duration: 0.2 } }}
                  transition={{
                    delay: i * 0.04,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className={`border-slate-50 transition-colors hover:bg-slate-50/60 group
                  ${deletingId === dest._id ? "opacity-40 pointer-events-none" : ""}`}
                >
                  {/* Image */}
                  <TableCell className="py-3 pl-4">
                    <div className="relative w-[72px] h-[52px] rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      {imgErrors[dest._id] ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageOff size={18} className="text-slate-300" />
                        </div>
                      ) : (
                        <img
                          src={dest.images?.[0] || "https://placehold.co/72x52"}
                          alt={dest.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={() =>
                            setImgErrors((p) => ({ ...p, [dest._id]: true }))
                          }
                        />
                      )}
                    </div>
                  </TableCell>

                  {/* Name */}
                  <TableCell className="font-semibold text-sm text-slate-800 max-w-[160px]">
                    <p className="truncate">{dest.name}</p>
                    {dest.description && (
                      <p className="text-xs text-slate-400 font-normal truncate mt-0.5">
                        {dest.description.slice(0, 48)}…
                      </p>
                    )}
                  </TableCell>

                  {/* Location — city + state merged */}
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <MapPin size={13} className="text-slate-400 shrink-0" />
                      <span className="truncate max-w-[120px]">
                        {[dest.city, dest.state].filter(Boolean).join(", ")}
                      </span>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <span
                      className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg border ${categoryStyle(dest.category)}`}
                    >
                      {dest.category || "—"}
                    </span>
                  </TableCell>

                  {/* Featured */}
                  <TableCell>
                    {dest.featured ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
                        <Star
                          size={11}
                          className="fill-amber-400 text-amber-400"
                        />
                        Featured
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100">
                        Standard
                      </span>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {/* Edit */}
                      <motion.div
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            navigate(`/destinations/edit/${dest._id}`)
                          }
                          className="h-8 px-3 text-xs font-semibold border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 gap-1.5"
                        >
                          <Pencil size={12} />
                          Edit
                        </Button>
                      </motion.div>

                      {/* Delete */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
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
                                <AlertTriangle
                                  size={18}
                                  className="text-rose-500"
                                />
                              </span>
                              <AlertDialogTitle className="text-base font-bold text-slate-800">
                                Delete destination?
                              </AlertDialogTitle>
                            </div>
                            <AlertDialogDescription className="text-sm text-slate-500 leading-relaxed pl-[52px]">
                              This will permanently remove{" "}
                              <span className="font-semibold text-slate-700">
                                "{dest.name}"
                              </span>{" "}
                              from the database. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter className="gap-2 mt-2">
                            <AlertDialogCancel className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(dest._id)}
                              className="rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold gap-1.5"
                            >
                              <Trash2 size={13} />
                              Yes, delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default DestinationTable;
