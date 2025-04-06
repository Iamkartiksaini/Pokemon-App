import { useState, useEffect } from "react";

const usePagination = (
  totalItems,
  pageSize,
  activeItemsCount = [],
  handlePageChange
) => {
  const initPageNumber = Math.ceil(activeItemsCount.length / pageSize);
  const [currentPage, setCurrentPage] = useState(initPageNumber || 1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / pageSize));
  }, [totalItems, pageSize]);

  const goToPage = async (page) => {
    if (page >= 1 && page <= totalPages) {
      handlePageChange({ key: page });
      setCurrentPage(page);
    }
  };

  const nextPage = async () => {
    if (currentPage < totalPages) {
      handlePageChange({ key: currentPage + 1 });
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = async () => {
    if (currentPage > 1) {
      handlePageChange({ key: currentPage - 1 });
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
