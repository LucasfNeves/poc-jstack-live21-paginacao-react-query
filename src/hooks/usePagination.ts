import { useCallback, useState } from "react";

export function usePagination(initialPage: number = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = totalItems ? Math.ceil(totalItems / 10) : 0;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => prev - 1);
  }, []);

  const handleSetPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSetTotalItems = useCallback((items: number) => {
    setTotalItems(items);
  }, []);

  return {
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    handleSetTotalItems,
    handleNextPage,
    handlePrevPage,
    handleSetPage,
  };
}
