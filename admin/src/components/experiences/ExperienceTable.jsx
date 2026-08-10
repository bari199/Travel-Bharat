import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import usePagination from "@/hook/usePagination";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Pencil,
  Trash2,
  Gauge,
  Clock,
  ChartBarStacked,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  AlertTriangle,
  SearchX,
  ImageOff,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Checkbox } from "@/components/ui/checkbox";

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

import PaginationControls from "@/hook/Paginationcontrols";

const ITEMS_PER_PAGE = 10;


const getFirstImageUrl = (exp) => {
  const first = exp?.images?.[0];
  if (!first) return null;
  if (typeof first === "string") return first;
  return first.url || null;
};


const columns = [
  { id: "select", header: "Select", sortable: false },
  { id: "image", header: "Image", sortable: false },
  {
    id: "title",
    header: "Title",
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
    id: "duration",
    header: "Duration",
    accessor: (row) => row.duration,
    sortable: true,
  },
  {
    id: "difficultyLevel",
    header: "Difficulty",
    accessor: (row) => row.difficultyLevel,
    sortable: true,
  },
  { id: "actions", header: "Actions", sortable: false },
];

const ExperienceTable = ({
  experiences = [],
  onDelete,
  onBulkDelete,
  onDeleteAll,
}) => {
  /* ==========================================================
      State
  ========================================================== */
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filteredExperiences, setFilteredExperiences] = useState(experiences);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [imgErrors, setImgErrors] = useState({});
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [deletingIds, setDeletingIds] = useState(() => new Set());

  /* ==========================================================
      Search / Filter
  ========================================================== */

  useEffect(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      setFilteredExperiences(experiences);
    } else {
      setFilteredExperiences(
        experiences.filter((exp) =>
          [exp?.title, exp?.destination?.name, exp?.category]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(query)),
        ),
      );
    }
  }, [search, experiences]);


  useEffect(() => {
    setSelectedIds((prev) => {
      if (prev.size === 0) return prev;
      const validIds = new Set(experiences.map((e) => e._id || e.id));
      const next = new Set([...prev].filter((id) => validIds.has(id)));
      return next.size === prev.size ? prev : next;
    });
  }, [experiences]);

  /* ==========================================================
      Sorting
  ========================================================== */

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

  const sortedExperiences = useMemo(() => {
    if (!sortBy) return filteredExperiences;

    const column = columns.find((col) => col.id === sortBy);
    if (!column?.accessor) return filteredExperiences;

    const sorted = [...filteredExperiences].sort((a, b) => {
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
  }, [filteredExperiences, sortBy, sortDirection]);

  /* ==========================================================
      Pagination (via shared hook)
  ========================================================== */

  const {
    currentPage,
    pageCount: totalPages,
    pageSize,
    paginatedData: paginatedExperiences,
    canPreviousPage,
    canNextPage,
    nextPage,
    prevPage,
    setCurrentPage,
  } = usePagination(sortedExperiences, ITEMS_PER_PAGE);

  /* Reset to page 1 whenever the filtered set changes */
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredExperiences]);


  const allFilteredIds = useMemo(
    () => sortedExperiences.map((e) => e._id || e.id),
    [sortedExperiences],
  );

  const isAllSelected =
    allFilteredIds.length > 0 &&
    allFilteredIds.every((id) => selectedIds.has(id));

  const isPartiallySelected =
    !isAllSelected && allFilteredIds.some((id) => selectedIds.has(id));

  const toggleSelectAll = () => {
    setSelectedIds(isAllSelected ? new Set() : new Set(allFilteredIds));
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

  /* ==========================================================
      Delete Experience — single + bulk
  ========================================================== */

  const handleDelete = async (id) => {
    setDeletingIds((prev) => new Set(prev).add(id));
    try {
      await onDelete?.(id);
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
      !search.trim() && ids.length > 0 && ids.length === experiences.length;

    try {
      if (isEverything && onDeleteAll) {
        await onDeleteAll();
      } else if (onBulkDelete) {
        await onBulkDelete(ids);
      } else {
        // Fallback for parents that haven't wired up onBulkDelete yet —
        // delete one at a time using the existing single-delete prop.
        for (const id of ids) {
          // eslint-disable-next-line no-await-in-loop
          await onDelete?.(id);
        }
      }
    } finally {
      setDeletingIds(new Set());
      setSelectedIds(new Set());
    }
  };

  /* ==========================================================
      Render
  ========================================================== */

  return (
    <div className="space-y-6">
      {/* =====================================
          Top Toolbar
      ===================================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Input
          placeholder="Search experiences..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:max-w-sm"
        />

        <Button asChild>
          <Link to="/experiences/add">Add Experience</Link>
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
                {selectedIds.size} experience{selectedIds.size !== 1 ? "s" : ""} selected
                {isAllSelected && !search.trim() && experiences.length > 0
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
                          Delete {selectedIds.size} experience
                          {selectedIds.size !== 1 ? "s" : ""}?
                        </AlertDialogTitle>
                      </div>
                      <AlertDialogDescription className="text-sm text-slate-500 dark:text-stone-400 leading-relaxed pl-[52px]">
                        This will permanently remove{" "}
                        <span className="font-semibold text-slate-700 dark:text-stone-200">
                          {selectedIds.size} selected experience
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
                        isAllSelected ? true : isPartiallySelected ? "indeterminate" : false
                      }
                      onCheckedChange={toggleSelectAll}
                      disabled={allFilteredIds.length === 0}
                      aria-label="Select all experiences"
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
            {/* Empty state */}
            {filteredExperiences.length === 0 && (
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
                      No Experiences Found
                    </p>
                    <p className="text-xs text-slate-400 dark:text-stone-500">
                      Create your first experience.
                    </p>
                  </motion.div>
                </TableCell>
              </TableRow>
            )}

            {/* Data rows */}
            <AnimatePresence initial={false}>
              {filteredExperiences.length > 0 &&
                paginatedExperiences.map((exp) => (
                  <motion.tr
                    key={exp._id || exp.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -24, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.2 }}
                    className={`border-slate-50 dark:border-stone-800/60 transition-colors hover:bg-slate-50 dark:hover:bg-stone-800/60
                    ${deletingIds.has(exp._id || exp.id) ? "opacity-40 pointer-events-none" : ""}
                    ${selectedIds.has(exp._id || exp.id) ? "bg-orange-50/50 dark:bg-orange-500/5" : ""}`}
                  >
                    {/* Select */}
                    <TableCell className="pl-4 w-10">
                      <Checkbox
                        checked={selectedIds.has(exp._id || exp.id)}
                        onCheckedChange={() => toggleRow(exp._id || exp.id)}
                        aria-label={`Select ${exp.title}`}
                      />
                    </TableCell>

                    {/* Image — supports both the current { url, public_id }
                        Cloudinary shape and legacy plain-string URLs, with
                        a graceful fallback if the image fails to load. */}
                    <TableCell>
                      {(() => {
                        const id = exp._id || exp.id;
                        const src = getFirstImageUrl(exp);

                        if (!src || imgErrors[id]) {
                          return (
                            <div className="w-16 h-14 rounded-md bg-slate-100 dark:bg-stone-800 flex items-center justify-center text-slate-400 dark:text-stone-500">
                              {imgErrors[id] ? (
                                <ImageOff className="w-5 h-5" />
                              ) : (
                                <MapPin className="w-5 h-5" />
                              )}
                            </div>
                          );
                        }

                        return (
                          <img
                            src={src}
                            alt={exp.title}
                            loading="lazy"
                            decoding="async"
                            className="w-16 h-14 object-cover rounded-md"
                            onError={() =>
                              setImgErrors((prev) => ({ ...prev, [id]: true }))
                            }
                          />
                        );
                      })()}
                    </TableCell>

                    <TableCell className="font-semibold text-sm text-slate-800 dark:text-stone-100">
                      {exp.title}
                    </TableCell>

                    <TableCell className="text-sm text-slate-600 dark:text-stone-300">
                      {exp.destination?.name || "—"}
                    </TableCell>

                    <TableCell className="text-sm text-slate-600 dark:text-stone-300">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-500/20">
                      <ChartBarStacked size={11} 
                        className="text-sky-400" />
                      {exp.category || "—"}
                      </span>
                    </TableCell>

                    <TableCell className="text-sm text-slate-600 dark:text-stone-300">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-500/20">
                      <Clock size={11}
                          className=" text-green-400"/>
                          {exp.duration || "—"}
                      </span>
                    </TableCell>

                    <TableCell className="text-center text-sm text-slate-600 dark:text-stone-300">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20">
                        <Gauge
                          size={11}
                          className=" text-amber-400"
                        />
                        {exp.difficultyLevel || "—"}
                      </span>
                    </TableCell>

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
                              navigate(`/experiences/edit/${exp._id || exp.id}`)
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
                                  Delete experience?
                                </AlertDialogTitle>
                              </div>
                              <AlertDialogDescription className="text-sm text-slate-500 dark:text-stone-400 leading-relaxed pl-[52px]">
                                This will permanently remove{" "}
                                <span className="font-semibold text-slate-700 dark:text-stone-200">
                                  "{exp.title}"
                                </span>{" "}
                                from the database. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter className="gap-2 mt-2">
                              <AlertDialogCancel className="rounded-xl border-slate-200 dark:border-stone-700 text-slate-600 dark:text-stone-300 hover:bg-slate-50 dark:hover:bg-stone-800 text-sm font-medium">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(exp._id || exp.id)}
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
            Pagination Controls
        ===================================== */}

        {filteredExperiences.length > 0 && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 dark:border-stone-800">
            <PaginationControls
              currentPage={currentPage}
              pageCount={totalPages}
              pageSize={pageSize}
              totalItems={filteredExperiences.length}
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

export default ExperienceTable;