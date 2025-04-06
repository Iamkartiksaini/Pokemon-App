import { useRef } from "react";

const useInfiniteScroll = ({
  currentItemsArr,
  handlePageChange,
  pageSize = 20,
}) => {
  const observerRef = useRef(null);

  function addObserver(element) {
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries.length > 0) {
        entries.forEach(async (card) => {
          if (card.target.id === element.id) {
            const currentPageNumber = currentItemsArr.length / pageSize;
            console.log(
              "making Api call of page ==>",
              currentPageNumber,
              element.getAttribute("data-item-index")
            );
            await handlePageChange({ key: currentPageNumber });
          } else {
            console.log("Another Card", card.target);
          }
        });
      }
    });
    element && observerRef.current.observe(element);
  }

  function removeObserver(element) {
    if (observerRef.current && element) {
      observerRef.current.unobserve(element);
    }
  }

  return { addObserver, removeObserver };
};

export default useInfiniteScroll;
