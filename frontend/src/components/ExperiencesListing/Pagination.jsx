import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    if (totalPages <= 6) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, "…", totalPages];
    if (currentPage >= totalPages - 2) return [1, "…", totalPages - 2, totalPages - 1, totalPages];
    return [1, "…", currentPage - 1, currentPage, currentPage + 1, "…", totalPages];
  };

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8 flex-wrap">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
        className="w-9 h-9 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 flex items-center justify-center disabled:opacity-30 hover:border-orange-400 hover:text-orange-500 transition"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {getPages().map((page, i) =>
        page === "…" ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 dark:text-slate-500 text-sm">…</span>
        ) : (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-9 h-9 rounded-xl text-sm font-medium transition ${
              currentPage === page
                ? "bg-orange-500 text-white border border-orange-500"
                : "bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:border-orange-400 hover:text-orange-500"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p + 1)}
        className="w-9 h-9 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 flex items-center justify-center disabled:opacity-30 hover:border-orange-400 hover:text-orange-500 transition"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;