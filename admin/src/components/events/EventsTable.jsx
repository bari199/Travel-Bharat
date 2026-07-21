import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import usePagination from "@/hook/usePagination";
import { useNavigate } from "react-router-dom";
import {
  Pencil,
  Trash2,
  CalendarDays,
  MapPin,
  IndianRupee,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  AlertTriangle,
  SearchX,
  ImageOff,
  CalendarX2,
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

/* ============================================
    Helper — event images are stored as plain
    Cloudinary URL strings on the backend.
============================================ */

const getFirstImageUrl = (event) => {
  const first = event?.images?.[0];
  if (!first) return null;
  if (typeof first === "string") return first;
  return first.url || null;
};

const formatEventDate = (date) => {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* ============================================
    Column Definitions
============================================ */

const columns = [
  { id: "select", header: "Select", sortable: false },
  { id: "image", header: "Image", sortable: false },
  { id: "title", header: "Title", accessor: (row) => row.title, sortable: true },
  {
    id: "destination",
    header: "Destination",
    accessor: (row) => row.destination?.name,
    sortable: true,
  },
  { id: "category", header: "Category", accessor: (row) => row.category, sortable: true },
  { id: "eventDate", header: "Date", accessor: (row) => row.eventDate, sortable: true },
  { id: "location", header: "Location", accessor: (row) => row.location, sortable: true },
  {
    id: "ticketPrice",
    header: "Price",
    accessor: (row) => row.ticketPrice,
    sortable: true,
  },
  { id: "actions", header: "Actions", sortable: false },
];

const EventsTable = ({ events = [], onDelete, onBulkDelete, onDeleteAll }) => {
  /* ========================================================== */
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);
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
      setFilteredEvents(events);
    } else {
      setFilteredEvents(
        events.filter((event) =>
          [event?.title, event?.destination?.name, event?.category, event?.location]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(query)),
        ),
      );
    }
  }, [search, events]);

  useEffect(() => {
    setSelectedIds((prev) => {
      if (prev.size === 0) return prev;
      const validIds = new Set(events.map((e) => e._id || e.id));
      const next = new Set([...prev].filter((id) => validIds.has(id)));
      return next.size === prev.size ? prev : next;
    });
  }, [events]);

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
      return <ArrowUpDown className="w-3.5 h-3.5 text-slate-300 dark:text-stone-600" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-3.5 h-3.5" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5" />
    );
  };

  const sortedEvents = useMemo(() => {
    if (!sortBy) return filteredEvents;

    const column = columns.find((col) => col.id === sortBy);
    if (!column?.accessor) return filteredEvents;

    const sorted = [...filteredEvents].sort((a, b) => {
      const valA = column.accessor(a);
      const valB = column.accessor(b);

      if (valA == null) return 1;
      if (valB == null) return -1;

      if (sortBy === "eventDate") {
        return new Date(valA) - new Date(valB);
      }

      if (typeof valA === "number" && typeof valB === "number") {
        return valA - valB;
      }

      return String(valA).localeCompare(String(valB));
    });

    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [filteredEvents, sortBy, sortDirection]);

  /* ==========================================================
      Pagination
  ========================================================== */

  const {
    currentPage,
    pageCount: totalPages,
    pageSize,
    paginatedData: paginatedEvents,
    canPreviousPage,
    canNextPage,
    nextPage,
    prevPage,
    setCurrentPage,
  } = usePagination(sortedEvents, ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredEvents]);

  /* ==========================================================
      Row selection
  ========================================================== */

  const allFilteredIds = useMemo(
    () => sortedEvents.map((e) => e._id || e.id),
    [sortedEvents],
  );

  const isAllSelected =
    allFilteredIds.length > 0 && allFilteredIds.every((id) => selectedIds.has(id));

  const isPartiallySelected =
    !isAllSelected && allFilteredIds.some((id) => selectedIds.has(id));

  const toggleSelectAll = () => {
    setSelectedIds(isAllSelected ? new Set() : new Set(allFilteredIds));
  };

  const toggleRow = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  /* ==========================================================
      Delete — single + bulk
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
      !search.trim() && ids.length > 0 && ids.length === events.length;

    try {
      if (isEverything && onDeleteAll) {
        await onDeleteAll();
      } else if (onBulkDelete) {
        await onBulkDelete(ids);
      } else {
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
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Input
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:max-w-sm"
        />

        <Button asChild>
          <Link to="/events/add">Add Event</Link>
        </Button>
      </div>

      {/* Bulk selection bar */}
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
                {selectedIds.size} event{selectedIds.size !== 1 ? "s" : ""} selected
                {isAllSelected && !search.trim() && events.length > 0 ? " (all)" : ""}
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
                          Delete {selectedIds.size} event{selectedIds.size !== 1 ? "s" : ""}?
                        </AlertDialogTitle>
                      </div>
                      <AlertDialogDescription className="text-sm text-slate-500 dark:text-stone-400 leading-relaxed pl-[52px]">
                        This will permanently remove{" "}
                        <span className="font-semibold text-slate-700 dark:text-stone-200">
                          {selectedIds.size} selected event{selectedIds.size !== 1 ? "s" : ""}
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

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="bg-white dark:bg-stone-900 border border-slate-100 dark:border-stone-800 rounded-2xl shadow-sm overflow-hidden"
      >
        <Table>
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
                      checked={isAllSelected ? true : isPartiallySelected ? "indeterminate" : false}
                      onCheckedChange={toggleSelectAll}
                      disabled={allFilteredIds.length === 0}
                      aria-label="Select all events"
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

          <TableBody>
            {filteredEvents.length === 0 && (
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
                      No Events Found
                    </p>
                    <p className="text-xs text-slate-400 dark:text-stone-500">
                      Create your first event.
                    </p>
                  </motion.div>
                </TableCell>
              </TableRow>
            )}

            <AnimatePresence initial={false}>
              {filteredEvents.length > 0 &&
                paginatedEvents.map((event) => (
                  <motion.tr
                    key={event._id || event.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -24, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.2 }}
                    className={`border-slate-50 dark:border-stone-800/60 transition-colors hover:bg-slate-50 dark:hover:bg-stone-800/60
                    ${deletingIds.has(event._id || event.id) ? "opacity-40 pointer-events-none" : ""}
                    ${selectedIds.has(event._id || event.id) ? "bg-orange-50/50 dark:bg-orange-500/5" : ""}`}
                  >
                    <TableCell className="pl-4 w-10">
                      <Checkbox
                        checked={selectedIds.has(event._id || event.id)}
                        onCheckedChange={() => toggleRow(event._id || event.id)}
                        aria-label={`Select ${event.title}`}
                      />
                    </TableCell>

                    <TableCell>
                      {(() => {
                        const id = event._id || event.id;
                        const src = getFirstImageUrl(event);

                        if (!src || imgErrors[id]) {
                          return (
                            <div className="w-16 h-14 rounded-md bg-slate-100 dark:bg-stone-800 flex items-center justify-center text-slate-400 dark:text-stone-500">
                              {imgErrors[id] ? (
                                <ImageOff className="w-5 h-5" />
                              ) : (
                                <CalendarX2 className="w-5 h-5" />
                              )}
                            </div>
                          );
                        }

                        return (
                          <img
                            src={src}
                            alt={event.title}
                            loading="lazy"
                            decoding="async"
                            className="w-16 h-14 object-cover rounded-md"
                            onError={() => setImgErrors((prev) => ({ ...prev, [id]: true }))}
                          />
                        );
                      })()}
                    </TableCell>

                    <TableCell className="font-semibold text-sm text-slate-800 dark:text-stone-100">
                      {event.title}
                    </TableCell>

                    <TableCell className="text-sm text-slate-600 dark:text-stone-300">
                      {event.destination?.name || "—"}
                    </TableCell>

                    <TableCell className="text-sm text-slate-600 dark:text-stone-300">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-500/20">
                        {event.category || "—"}
                      </span>
                    </TableCell>

                    <TableCell className="text-sm text-slate-600 dark:text-stone-300">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-500/20">
                        <CalendarDays size={11} className="text-green-400" />
                        {formatEventDate(event.eventDate)}
                      </span>
                    </TableCell>

                    <TableCell className="text-sm text-slate-600 dark:text-stone-300">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={11} className="text-slate-400" />
                        {event.location || "—"}
                      </span>
                    </TableCell>

                    <TableCell className="text-sm text-slate-600 dark:text-stone-300">
                      <span className="inline-flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
                        <IndianRupee size={11} />
                        {event.ticketPrice || 0}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/events/edit/${event._id || event.id}`)}
                          className="h-8 px-3 text-xs font-semibold border-slate-200 dark:border-stone-700 text-slate-600 dark:text-stone-300 hover:bg-slate-50 dark:hover:bg-stone-800 hover:text-slate-800 dark:hover:text-stone-100 hover:border-slate-300 dark:hover:border-stone-600 gap-1.5"
                        >
                          <Pencil size={12} />
                          Edit
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-3 text-xs font-semibold border-rose-100 dark:border-rose-500/20 text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-500/30 gap-1.5"
                            >
                              <Trash2 size={12} />
                              Delete
                            </Button>
                          </AlertDialogTrigger>

                          <AlertDialogContent className="rounded-2xl border-slate-100 dark:border-stone-800 shadow-xl max-w-md">
                            <AlertDialogHeader>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0">
                                  <AlertTriangle size={18} className="text-rose-500" />
                                </span>
                                <AlertDialogTitle className="text-base font-bold text-slate-800 dark:text-stone-100">
                                  Delete event?
                                </AlertDialogTitle>
                              </div>
                              <AlertDialogDescription className="text-sm text-slate-500 dark:text-stone-400 leading-relaxed pl-[52px]">
                                This will permanently remove{" "}
                                <span className="font-semibold text-slate-700 dark:text-stone-200">
                                  "{event.title}"
                                </span>{" "}
                                from the database. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter className="gap-2 mt-2">
                              <AlertDialogCancel className="rounded-xl border-slate-200 dark:border-stone-700 text-slate-600 dark:text-stone-300 hover:bg-slate-50 dark:hover:bg-stone-800 text-sm font-medium">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(event._id || event.id)}
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

        {filteredEvents.length > 0 && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 dark:border-stone-800">
            <PaginationControls
              currentPage={currentPage}
              pageCount={totalPages}
              pageSize={pageSize}
              totalItems={filteredEvents.length}
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

export default EventsTable;