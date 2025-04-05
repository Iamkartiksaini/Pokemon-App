import usePagination from '@/hook/usePagination';
import { Fragment } from 'react';

const Pagination = ({ handlePageChange, activeItemsCount, totalItems = 50, pageSize = 20 }) => {
    const {
        currentPage,
        totalPages,
        goToPage,
        nextPage,
        prevPage,
        pageNumbers,
    } = usePagination(totalItems, pageSize, activeItemsCount, handlePageChange);

    const pageBtns = pageNumbers()

    return (
        <div className=" flex items-center gap-4 justify-center mt-4">
            <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50`}
            >
                Previous
            </button>
            <div className="flex items-center space-x-2">
                {pageBtns.map((page) => (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-1 rounded-md ${currentPage === page
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {page}
                    </button>
                ))}
                {!pageBtns.includes(totalPages) && <Fragment>
                    <button>...</button>
                    <button
                        onClick={() => goToPage(totalPages)}
                        className={`px-3 py-1 rounded-md ${currentPage === totalPages
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {totalPages}
                    </button>
                </Fragment>}
            </div>
            <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50`}
            >
                Next
            </button>
            <select
                onChange={(e) => goToPage(Number(e.target.value))}
                value={currentPage}
                className="ml-4 border border-gray-300 rounded-md p-1"
            >
                {[...Array(totalPages).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                        Page {num + 1}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Pagination;
