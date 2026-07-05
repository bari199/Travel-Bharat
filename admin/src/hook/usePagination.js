import { useState, useMemo, useEffect } from "react";

/**
 * Shared pagination hook.
 *
 * Takes the already-filtered/sorted data array and slices it for you,
 * so tables no longer need their own paginatedData useMemo.
 *
 * @param {Array} data - filtered/sorted data to paginate
 * @param {number} initialPageSize - rows per page (default 10)
 */
const usePagination = (data = [], initialPageSize = 10) => {
  const [pageIndex, setPageIndex] = useState(0); // 0-based internally
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalItems = data.length;
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));

  // Keep pageIndex in range when filtering/sorting/pageSize shrinks the set
  useEffect(() => {
    if (pageIndex > pageCount - 1) {
      setPageIndex(0);
    }
  }, [pageCount, pageIndex]);

  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, pageIndex, pageSize]);

  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < pageCount - 1;

  const nextPage = () => canNextPage && setPageIndex((p) => p + 1);
  const prevPage = () => canPreviousPage && setPageIndex((p) => p - 1);
  const goToPage = (page) =>
    setPageIndex(Math.min(Math.max(0, page - 1), pageCount - 1));

  return {
    pageIndex, // 0-based
    currentPage: pageIndex + 1, // 1-based, for display
    pageSize,
    pageCount,
    totalItems,
    paginatedData,
    canPreviousPage,
    canNextPage,
    nextPage,
    prevPage,
    setCurrentPage: goToPage,
    setPageIndex,
    setPageSize,
  };
};

export default usePagination;