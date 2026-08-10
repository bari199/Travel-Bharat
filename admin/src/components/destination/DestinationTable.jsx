import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pencil,
  Trash2,
  MapPin,
  Star,
  ImageOff,
  AlertTriangle,
  SearchX,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";

import usePagination from "@/hook/usePagination";
import PaginationControls from "@/hook/Paginationcontrols";

/* ── Category color map ─────────────────────────────────────── */
const CATEGORY_STYLES = {
  Beach:
    "bg-sky-50 dark:bg-sky-500/10   text-sky-600 dark:text-sky-400   border-sky-100 dark:border-sky-500/20",
  Mountain:
    "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20",
  Heritage:
    "bg-amber-50 dark:bg-amber-500/10  text-amber-600 dark:text-amber-400  border-amber-100 dark:border-amber-500/20",
  Forest:
    "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20",
  Desert:
    "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-500/20",
  Wildlife:
    "bg-lime-50 dark:bg-lime-500/10   text-lime-700 dark:text-lime-400   border-lime-100 dark:border-lime-500/20",
  Spiritual:
    "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-500/20",
  default:
    "bg-slate-50 dark:bg-stone-800  text-slate-600 dark:text-stone-300  border-slate-100 dark:border-stone-800",
};

const categoryStyle = (cat) => CATEGORY_STYLES[cat] ?? CATEGORY_STYLES.default;

/* ── Row skeleton for loading state ─────────────────────────── */
const SkeletonRow = ({ i }) => (
  <TableRow className="border-slate-50 dark:border-stone-800/60">
    {[16, 20, 36, 24, 28, 24, 20, 28].map((w, j) => (
      <TableCell key={j}>
        <div
          className="h-4 rounded-lg bg-slate-100 dark:bg-stone-800 animate-pulse"
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
  { id: "select", header: "Select", sortable: false },
  { id: "image", header: "Image", sortable: false },
  {
    id: "name",
    header: "Destination",
    accessor: (row) => row.name,
    sortable: true,
  },
  {
    id: "location",
    header: "Location",
    accessor: (row) => [row.city, row.state].filter(Boolean).join(", "),
    sortable: true,
  },
  {
    id: "category",
    header: "Category",
    accessor: (row) => row.category,
    sortable: true,
  },
  {
    id: "featured",
    header: "Featured",
    accessor: (row) => (row.featured ? 1 : 0),
    sortable: true,
  },
  { id: "actions", header: "Actions", sortable: false },
];

/* ════════════════════════════════════════════════════════════ */
const DestinationTable = ({
  destinations,
  onDelete,
  onBulkDelete,
  onDeleteAll,
  loading = false,
}) => {
  const navigate = useNavigate();
  const [imgErrors, setImgErrors] = useState({});
  const [deletingIds, setDeletingIds] = useState(() => new Set());
  const [selectedIds, setSelectedIds] = useState(() => new Set());

  const [globalFilter, setGlobalFilter] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

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

  const renderSortIcon = (columnId) => {
    if (sortBy !== columnId) {
      return (
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-300 dark:text-stone-600" />
      );
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-3.5 h-3.5" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5" />
    );
  };


  

  const safeDestinations = Array.isArray(destinations) ? destinations : [];


  useEffect(() => {
    setSelectedIds((prev) => {
      if (prev.size === 0) return prev;
      const validIds = new Set(safeDestinations.map((d) => d._id));
      const next = new Set([...prev].filter((id) => validIds.has(id)));
      return next.size === prev.size ? prev : next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinations]);

  const filteredData = useMemo(() => {
    if (!globalFilter.trim()) return safeDestinations;

    const term = globalFilter.trim().toLowerCase();

    return safeDestinations.filter((row) => {
      const searchable = [row.name, row.city, row.state, row.category]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(term);
    });
  }, [safeDestinations, globalFilter]);

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
    paginatedData: paginatedDestinations,
    canPreviousPage,
    canNextPage,
    nextPage,
    prevPage,
    setCurrentPage,
  } = usePagination(sortedData, 10);



  const allFilteredIds = useMemo(
    () => sortedData.map((d) => d._id),
    [sortedData],
  );

  const isAllSelected =
    allFilteredIds.length > 0 &&
    allFilteredIds.every((id) => selectedIds.has(id));

  const isPartiallySelected =
    !isAllSelected && allFilteredIds.some((id) => selectedIds.has(id));

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      if (isAllSelected) return new Set();
      return new Set(allFilteredIds);
    });
  };

  const toggleRow = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  /* ============================================
      Delete — single + bulk
  ============================================ */

  const handleDelete = async (id) => {
    setDeletingIds((prev) => new Set(prev).add(id));
    try {
      await onDelete(id);
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      setSelectedIds((prev) => {
        if (!prev.has(id)) return prev;
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleBulkDeleteConfirm = async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;

    setDeletingIds(new Set(ids));


    
    const isEverything =
      !globalFilter.trim() &&
      ids.length > 0 &&
      ids.length === safeDestinations.length;

    try {
      if (isEverything && onDeleteAll) {
        await onDeleteAll();
      } else if (onBulkDelete) {
        await onBulkDelete(ids);
      } else {
        // Fallback for parents that haven't wired up onBulkDelete yet —
        // delete one at a time using the existing single-delete prop so
        // multi-select still works out of the box.
        for (const id of ids) {
          // eslint-disable-next-line no-await-in-loop
          await onDelete(id);
        }
      }
    } finally {
      setDeletingIds(new Set());
      setSelectedIds(new Set());
    }
  };

  return (
    <div className="space-y-6">
      {/* =====================================
          Top Toolbar
      ===================================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Input
          placeholder="Search destinations..."
          value={globalFilter}
          onChange={(event) => {
            setGlobalFilter(event.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:max-w-sm"
        />

        <Button asChild>
          <Link to="/destinations/add">Add Destination</Link>
        </Button>
      </div>

      {/* =====================================
          Bulk Selection Bar
          Only shows once at least one row is checked.
      ===================================== */}
      <AnimatePresence initial={false}>
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-orange-100 dark:border-orange-500/20 bg-orange-50/70 dark:bg-orange-500/10 px-4 py-3">
              <p className="text-sm font-semibold text-orange-700 dark:text-orange-400">
                {selectedIds.size} destination
                {selectedIds.size !== 1 ? "s" : ""} selected
                {isAllSelected &&
                !globalFilter.trim() &&
                safeDestinations.length > 0
                  ? " (all)"
                  : ""}
              </p>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearSelection}
                  className="h-8 text-xs font-semibold text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-500/10"
                >
                  Clear
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 text-xs font-semibold border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:border-rose-300 gap-1.5"
                    >
                      <Trash2 size={12} />
                      Delete Selected
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="rounded-2xl border-slate-100 dark:border-stone-800 shadow-xl max-w-md">
                    <AlertDialogHeader>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0">
                          <AlertTriangle size={18} className="text-rose-500" />
                        </span>
                        <AlertDialogTitle className="text-base font-bold text-slate-800 dark:text-stone-100">
                          Delete {selectedIds.size} destination
                          {selectedIds.size !== 1 ? "s" : ""}?
                        </AlertDialogTitle>
                      </div>
                      <AlertDialogDescription className="text-sm text-slate-500 dark:text-stone-400 leading-relaxed pl-[52px]">
                        This will permanently remove{" "}
                        <span className="font-semibold text-slate-700 dark:text-stone-200">
                          {selectedIds.size} selected destination
                          {selectedIds.size !== 1 ? "s" : ""}
                        </span>{" "}
                        from the database. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="gap-2 mt-2">
                      <AlertDialogCancel className="rounded-xl border-slate-200 dark:border-stone-700 text-slate-600 dark:text-stone-300 hover:bg-slate-50 dark:hover:bg-stone-800 text-sm font-medium">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleBulkDeleteConfirm}
                        className="rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold gap-1.5"
                      >
                        <Trash2 size={13} />
                        Yes, delete all selected
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  className={`text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-stone-500 py-3.5 ${
                    column.id === "select" ? "w-10 pl-4 pr-0" : ""
                  }`}
                >
                  {column.id === "select" ? (
                    <Checkbox
                      checked={
                        isAllSelected
                          ? true
                          : isPartiallySelected
                            ? "indeterminate"
                            : false
                      }
                      onCheckedChange={toggleSelectAll}
                      disabled={allFilteredIds.length === 0}
                      aria-label="Select all destinations"
                    />
                  ) : column.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(column.id)}
                      className="flex items-center gap-1 hover:text-slate-600 dark:hover:text-stone-300"
                    >
                      {column.header}
                      {renderSortIcon(column.id)}
                    </button>
                  ) : (
                    column.header
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
            {!loading && sortedData.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="py-20 text-center"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <span className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-stone-800 flex items-center justify-center">
                      <SearchX
                        size={24}
                        className="text-slate-400 dark:text-stone-500"
                      />
                    </span>
                    <p className="text-sm font-semibold text-slate-600 dark:text-stone-300">
                      No destinations found
                    </p>
                    <p className="text-xs text-slate-400 dark:text-stone-500">
                      Add a new destination to get started
                    </p>
                  </motion.div>
                </TableCell>
              </TableRow>
            )}

            {/* Data rows */}
            <AnimatePresence initial={false}>
              {!loading &&
                paginatedDestinations?.map((dest, i) => (
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
                    className={`border-slate-50 dark:border-stone-800/60 transition-colors hover:bg-slate-50 dark:hover:bg-stone-800/60 group
                  ${deletingIds.has(dest._id) ? "opacity-40 pointer-events-none" : ""}
                  ${selectedIds.has(dest._id) ? "bg-orange-50/50 dark:bg-orange-500/5" : ""}`}
                  >
                    {/* Select */}
                    <TableCell className="py-3 pl-4 w-10">
                      <Checkbox
                        checked={selectedIds.has(dest._id)}
                        onCheckedChange={() => toggleRow(dest._id)}
                        aria-label={`Select ${dest.name}`}
                      />
                    </TableCell>

                    {/* Image */}
                    <TableCell className="py-3 pl-4">
                      <div className="relative w-[72px] h-[52px] rounded-xl overflow-hidden bg-slate-100 dark:bg-stone-800 shrink-0">
                        {imgErrors[dest._id] ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageOff
                              size={18}
                              className="text-slate-300 dark:text-stone-600"
                            />
                          </div>
                        ) : (
                          <img
                            src={
                              dest.images?.[0]?.url ||
                              "https://placehold.co/72x52"
                            }
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
                    <TableCell className="font-semibold text-sm text-slate-800 dark:text-stone-100 max-w-[160px]">
                      <p className="truncate">{dest.name}</p>
                      {dest.description && (
                        <p className="text-xs text-slate-400 dark:text-stone-500 font-normal truncate mt-0.5">
                          {dest.description.slice(0, 48)}…
                        </p>
                      )}
                    </TableCell>

                    {/* Location — city + state merged */}
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-stone-300">
                        <MapPin
                          size={13}
                          className="text-slate-400 dark:text-stone-500 shrink-0"
                        />
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
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20">
                          <Star
                            size={11}
                            className="fill-amber-400 text-amber-400"
                          />
                          Featured
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 dark:text-stone-500 font-medium px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-stone-800 border border-slate-100 dark:border-stone-800">
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
                            className="h-8 px-3 text-xs font-semibold border-slate-200 dark:border-stone-700 text-slate-600 dark:text-stone-300 hover:bg-slate-50 dark:hover:bg-stone-800 hover:text-slate-800 dark:hover:text-stone-100 hover:border-slate-300 dark:hover:border-stone-600 gap-1.5"
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
                                className="h-8 px-3 text-xs font-semibold border-rose-100 dark:border-rose-500/20 text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-500/30 gap-1.5"
                              >
                                <Trash2 size={12} />
                                Delete
                              </Button>
                            </motion.div>
                          </AlertDialogTrigger>

                          <AlertDialogContent className="rounded-2xl border-slate-100 dark:border-stone-800 shadow-xl max-w-md">
                            <AlertDialogHeader>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0">
                                  <AlertTriangle
                                    size={18}
                                    className="text-rose-500"
                                  />
                                </span>
                                <AlertDialogTitle className="text-base font-bold text-slate-800 dark:text-stone-100">
                                  Delete destination?
                                </AlertDialogTitle>
                              </div>
                              <AlertDialogDescription className="text-sm text-slate-500 dark:text-stone-400 leading-relaxed pl-[52px]">
                                This will permanently remove{" "}
                                <span className="font-semibold text-slate-700 dark:text-stone-200">
                                  "{dest.name}"
                                </span>{" "}
                                from the database. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter className="gap-2 mt-2">
                              <AlertDialogCancel className="rounded-xl border-slate-200 dark:border-stone-700 text-slate-600 dark:text-stone-300 hover:bg-slate-50 dark:hover:bg-stone-800 text-sm font-medium">
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

        {!loading && sortedData.length > 0 && (
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
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DestinationTable;
