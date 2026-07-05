import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const getPageNumbers = (currentPage, pageCount) => {
  const delta = 1;
  const pages = [];

  for (let i = 1; i <= pageCount; i++) {
    if (
      i === 1 ||
      i === pageCount ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      pages.push(i);
    }
  }

  const withDots = [];
  let last;

  pages.forEach((i) => {
    if (last) {
      if (i - last === 2) withDots.push(last + 1);
      else if (i - last !== 1) withDots.push("...");
    }
    withDots.push(i);
    last = i;
  });

  return withDots;
};

/**
 * Shared pagination UI for admin tables (Activity, Destination, Experience).
 * Pairs with the usePagination hook.
 */
const PaginationControls = ({
  currentPage,
  pageCount,
  canPreviousPage,
  canNextPage,
  onPrevious,
  onNext,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems,
  pageSizeOptions = [10, 20, 50, 100],
}) => {
  if (pageCount <= 1) return null;

  const pages = getPageNumbers(currentPage, pageCount);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <strong>
          {Math.min((currentPage - 1) * pageSize + 1, totalItems)}
        </strong>
        {"–"}
        <strong>{Math.min(currentPage * pageSize, totalItems)}</strong> of{" "}
        <strong>{totalItems}</strong>
      </p>

      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPrevious();
              }}
              className={
                !canPreviousPage ? "pointer-events-none opacity-40" : ""
              }
            />
          </PaginationItem>

          {pages.map((page, idx) =>
            page === "..." ? (
              <PaginationItem key={`dots-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNext();
              }}
              className={!canNextPage ? "pointer-events-none opacity-40" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {onPageSizeChange && (
        <select
          disabled
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-9 rounded-md border px-3 text-sm bg-background"
        >
          {/* {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))} */}
        </select>
      )}
    </div>
  );
};

export default PaginationControls;