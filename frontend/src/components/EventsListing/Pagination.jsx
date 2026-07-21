import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">

      {/* Left */}

      <p className="text-sm text-gray-500 dark:text-slate-400">
        Page{" "}
        <span className="font-semibold text-orange-600 dark:text-orange-400">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-orange-600 dark:text-orange-400">
          {totalPages}
        </span>
      </p>

      {/* Right */}

      <div className="flex items-center gap-1.5 flex-wrap justify-center">

        {/* First */}

        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="w-9 h-9 rounded-xl border border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center hover:border-orange-400 hover:text-orange-500 dark:text-slate-300 transition disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous */}

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 rounded-xl border border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center hover:border-orange-400 hover:text-orange-500 dark:text-slate-300 transition disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Pages */}

        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={index}
              className="w-9 h-9 flex items-center justify-center text-gray-400 dark:text-slate-500 text-sm"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 rounded-xl text-sm font-medium transition ${
                currentPage === page
                  ? "bg-orange-500 text-white border border-orange-500"
                  : "bg-white dark:bg-slate-900 border border-orange-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:border-orange-400 hover:text-orange-500"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 rounded-xl border border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center hover:border-orange-400 hover:text-orange-500 dark:text-slate-300 transition disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last */}

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 rounded-xl border border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center hover:border-orange-400 hover:text-orange-500 dark:text-slate-300 transition disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};

export default Pagination;