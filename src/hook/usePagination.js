import { useState, useEffect } from "react";

const usePagination = (totalItems, pageSize, activeItemsCount = []) => {
  const initPageNumber = Math.ceil(activeItemsCount.length / pageSize);
  const [currentPage, setCurrentPage] = useState(initPageNumber || 1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / pageSize));
  }, [totalItems, pageSize]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const pageNumbers = () => {
    const pages = [];
    for (let i = -2; i <= 2; i++) {
      const page = currentPage + i;
      if (page > 0 && page <= totalPages) {
        pages.push(page);
      }
    }
    return pages;
  };
  return {
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    pageNumbers,
  };
};

export default usePagination;
