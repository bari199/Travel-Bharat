import { useMemo, useState } from "react";

import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import {
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ImageOff,
  AlertTriangle,
  SearchX,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

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

import { deleteActivity } from "@/services/activityApi";

import { toast } from "sonner";

import usePagination from "@/hook/usePagination";
import PaginationControls from "@/hook/Paginationcontrols";

/* ── Difficulty color map ───────────────────────────────────── */
const DIFFICULTY_STYLES = {
  Easy: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20",
  Moderate: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20",
  Difficult: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/20",
  Challenging: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/20",
  default: "bg-slate-50 dark:bg-stone-800 text-slate-600 dark:text-stone-300 border-slate-100 dark:border-stone-800",
};

const difficultyStyle = (level) =>
  DIFFICULTY_STYLES[level] ?? DIFFICULTY_STYLES.default;

/* ── Row skeleton for loading state ─────────────────────────── */
const SkeletonRow = ({ i }) => (
  <TableRow className="border-slate-50 dark:border-stone-800/60">
    {[20, 36, 24, 20, 16, 28].map((w, j) => (
      <TableCell key={j}>
        <div
          className="h-4 rounded-lg bg-slate-100 dark:bg-stone-800 animate-pulse mx-auto"
          style={{
            width: `${w * (i % 2 === 0 ? 1 : 0.75)}px`,
            animationDelay: `${j * 60}ms`,
          }}
        />
      </TableCell>
    ))}
  </TableRow>
);

/* ============================================
    Column Definitions

    accessor: how to read the raw value off a row
    (used for sorting + global filtering)
============================================ */

const columns = [
  {
    id: "image",
    header: "Image",
    sortable: false,
  },
  {
    id: "title",
    header: "Activity",
    accessor: (row) => row.title,
    sortable: true,
  },
  {
    id: "destination",
    header: "Destination",
    accessor: (row) => row.destination?.name,
    sortable: true,
  },
  {
    id: "category",
    header: "Category",
    accessor: (row) => row.category,
    sortable: true,
  },
  {
    id: "difficulty",
    header: "Difficulty",
    accessor: (row) => row.difficulty,
    sortable: true,
  },
  {
    id: "price",
    header: "Price",
    accessor: (row) => row.price,
    sortable: true,
  },
  {
    id: "actions",
    header: "Actions",
    sortable: false,
  },
];

const ActivityTable = ({ data = [], loading, onDeleteSuccess }) => {
  const safeData = Array.isArray(data) ? data : [];

  const [imgErrors, setImgErrors] = useState({});
  const [deletingId, setDeletingId] = useState(null);

  const [globalFilter, setGlobalFilter] = useState("");

  const [sortBy, setSortBy] = useState(null);

  const [sortDirection, setSortDirection] = useState("asc");

  /* ============================================
  Delete Activity
  ============================================ */

  const handleDelete = async (id) => {
    setDeletingId(id);

    try {
      await deleteActivity(id);

      toast.success("Activity deleted successfully.");

      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Failed to delete activity.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* ============================================
      Sorting
  ============================================ */

  const handleSort = (columnId) => {
    if (sortBy === columnId) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(columnId);
      setSortDirection("asc");
    }
  };

  /* ============================================
      Filtering + Sorting
      (derived from raw data)
  ============================================ */

  const filteredData = useMemo(() => {
    if (!globalFilter.trim()) return safeData;

    const term = globalFilter.trim().toLowerCase();

    return safeData.filter((row) => {
      const searchable = [
        row.title,
        row.category,
        row.difficulty,
        row.destination?.name,
        row.price != null ? String(row.price) : "",
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(term);
    });
  }, [safeData, globalFilter]);

  const sortedData = useMemo(() => {
    if (!sortBy) return filteredData;

    const column = columns.find((col) => col.id === sortBy);
    if (!column?.accessor) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const valA = column.accessor(a);
      const valB = column.accessor(b);

      if (valA == null) return 1;
      if (valB == null) return -1;

      if (typeof valA === "number" && typeof valB === "number") {
        return valA - valB;
      }

      return String(valA).localeCompare(String(valB));
    });

    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [filteredData, sortBy, sortDirection]);

  /* ============================================
      Pagination (via shared hook)
  ============================================ */

  const {
    currentPage,
    pageCount,
    pageSize,
    paginatedData,
    canPreviousPage,
    canNextPage,
    nextPage,
    prevPage,
    setCurrentPage,
    setPageSize,
  } = usePagination(sortedData, 10);

  const renderSortIcon = (columnId) => {
    if (sortBy !== columnId) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-slate-300 dark:text-stone-600" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-3.5 h-3.5" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5" />
    );
  };

  return (
    <div className="space-y-6">
      {/* =====================================
          Top Toolbar
      ===================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Input
          placeholder="Search activities..."
          value={globalFilter}
          onChange={(event) => {
            setGlobalFilter(event.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:max-w-sm"
        />

        <Button asChild>
          <Link to="/activities/add">Add Activity</Link>
        </Button>
      </div>

      {/* =====================================
          Table Card
      ===================================== */}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="bg-white dark:bg-stone-900 border border-slate-100 dark:border-stone-800 rounded-2xl shadow-sm overflow-hidden"
      >
        <Table>
          {/* ── Header ── */}
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-stone-800/70 border-slate-100 dark:border-stone-800 hover:bg-slate-50 dark:hover:bg-stone-800/70">
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-stone-500 py-3.5 text-center"
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(column.id)}
                      className="flex items-center justify-center gap-1 w-full hover:text-slate-600 dark:hover:text-stone-300"
                    >
                      {column.header}
                      {renderSortIcon(column.id)}
                    </button>
                  ) : (
                    <span className="flex items-center justify-center w-full">
                      {column.header}
                    </span>
                  )}
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
            {!loading && paginatedData.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="py-20 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <span className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-stone-800 flex items-center justify-center">
                      <SearchX size={24} className="text-slate-400 dark:text-stone-500" />
                    </span>
                    <p className="text-sm font-semibold text-slate-600 dark:text-stone-300">
                      No activities found
                    </p>
                    <p className="text-xs text-slate-400 dark:text-stone-500">
                      Add a new activity to get started
                    </p>
                  </motion.div>
                </TableCell>
              </TableRow>
            )}

            {/* Data rows */}
            <AnimatePresence initial={false}>
              {!loading &&
                paginatedData.map((row, i) => (
                  <motion.tr
                    key={row._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -24, transition: { duration: 0.2 } }}
                    transition={{
                      delay: i * 0.04,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className={`border-slate-50 dark:border-stone-800/60 transition-colors hover:bg-slate-50 dark:hover:bg-stone-800/60 group
                    ${deletingId === row._id ? "opacity-40 pointer-events-none" : ""}`}
                  >
                    {/* Image */}
                    <TableCell className="py-3">
                      <div className="relative w-[72px] h-[52px] rounded-xl overflow-hidden bg-slate-100 dark:bg-stone-800 shrink-0 mx-auto">
                        {imgErrors[row._id] ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageOff size={18} className="text-slate-300 dark:text-stone-600" />
                          </div>
                        ) : (
                          <img
                            src={row.images?.[0] || "https://placehold.co/72x52"}
                            alt={row.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={() =>
                              setImgErrors((p) => ({ ...p, [row._id]: true }))
                            }
                          />
                        )}
                      </div>
                    </TableCell>

                    {/* Title */}
                    <TableCell className="font-semibold text-sm text-slate-800 dark:text-stone-100 max-w-[160px] text-center">
                      <p className="truncate">{row.title}</p>
                      {row.shortDescription && (
                        <p className="text-xs text-slate-400 dark:text-stone-500 font-normal truncate mt-0.5">
                          {row.shortDescription.slice(0, 48)}…
                        </p>
                      )}
                    </TableCell>

                    {/* Destination */}
                    <TableCell className="text-center">
                      <span className="text-sm text-slate-600 dark:text-stone-300 truncate max-w-[120px] inline-block">
                        {row.destination?.name || "—"}
                      </span>
                    </TableCell>

                    {/* Category */}
                    <TableCell className="text-center">
                      <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg border bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-100 dark:border-sky-500/20">
                        {row.category || "—"}
                      </span>
                    </TableCell>

                    {/* Difficulty */}
                    <TableCell className="text-center">
                      <span
                        className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg border ${difficultyStyle(row.difficulty)}`}
                      >
                        {row.difficulty || "—"}
                      </span>
                    </TableCell>

                    {/* Price */}
                    <TableCell className="text-center">
                      {row.price ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20">
                          <Sparkles size={11} className="fill-amber-400 text-amber-400" />
                          ₹{row.price}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 dark:text-stone-500 font-medium px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-stone-800 border border-slate-100 dark:border-stone-800">
                          Free
                        </span>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        {/* Edit */}
                        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                          <Button
                            asChild
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 border-slate-200 dark:border-stone-700 text-slate-600 dark:text-stone-300 hover:bg-slate-50 dark:hover:bg-stone-800 hover:text-slate-800 dark:hover:text-stone-100 hover:border-slate-300 dark:hover:border-stone-600"
                          >
                            <Link to={`/activities/edit/${row._id}`}>
                              <Pencil size={14} />
                            </Link>
                          </Button>
                        </motion.div>

                        {/* Delete */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                              <Button
                                size="icon"
                                variant="outline"
                            className="h-8 w-8 border-rose-100 dark:border-rose-500/20 text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-500/30"
                              >
                                <Trash2 size={14} />
                              </Button>
                            </motion.div>
                          </AlertDialogTrigger>

                          <AlertDialogContent className="rounded-2xl border-slate-100 dark:border-stone-800 shadow-xl max-w-md">
                            <AlertDialogHeader>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0">
                                  <AlertTriangle size={18} className="text-rose-500" />
                                </span>
                                <AlertDialogTitle className="text-base font-bold text-slate-800 dark:text-stone-100">
                                  Delete activity?
                                </AlertDialogTitle>
                              </div>
                              <AlertDialogDescription className="text-sm text-slate-500 dark:text-stone-400 leading-relaxed pl-[52px]">
                                This will permanently remove{" "}
                                <span className="font-semibold text-slate-700 dark:text-stone-200">
                                  "{row.title}"
                                </span>{" "}
                                from the database. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter className="gap-2 mt-2">
                              <AlertDialogCancel className="rounded-xl border-slate-200 dark:border-stone-700 text-slate-600 dark:text-stone-300 hover:bg-slate-50 dark:hover:bg-stone-800 text-sm font-medium">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(row._id)}
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

        {/* =====================================
            Pagination (shadcn)
        ===================================== */}

        {!loading && (
          <div className="px-6 py-4 border-t border-slate-100 dark:border-stone-800">
            <PaginationControls
              currentPage={currentPage}
              pageCount={pageCount}
              pageSize={pageSize}
              totalItems={sortedData.length}
              canPreviousPage={canPreviousPage}
              canNextPage={canNextPage}
              onPrevious={prevPage}
              onNext={nextPage}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ActivityTable;