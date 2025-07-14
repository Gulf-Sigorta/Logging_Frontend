import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  const maxPageNumbersToShow = 10;
  const halfRange = Math.floor(maxPageNumbersToShow / 2);

  let startPage = page - halfRange;
  let endPage = page + halfRange + (maxPageNumbersToShow % 2 === 0 ? 0 : 1);

  if (startPage < 0) {
    startPage = 0;
    endPage = Math.min(totalPages, maxPageNumbersToShow);
  } else if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(0, totalPages - maxPageNumbersToShow);
  }

  const pageNumbers = [];
  for (let i = startPage; i < endPage; i++) {
    pageNumbers.push(i);
  }

  const showLeftEllipsis = startPage > 0;
  const showRightEllipsis = endPage < totalPages;

  const handleLeftEllipsisClick = () => {
    const newPage = Math.max(0, startPage - 10);
    onPageChange(newPage);
  };

  const handleRightEllipsisClick = () => {
    const newPage = Math.min(totalPages - 1, endPage + 9);
    onPageChange(newPage);
  };

  return (
    <nav aria-label="Page navigation example" className="flex justify-center mt-4">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={() => onPageChange(0)}
            disabled={page === 0}
          >
            <span className="sr-only">First</span>
            &laquo;&laquo;
          </button>
        </li>
        <li>
          <button
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
          >
            <span className="sr-only">Previous</span>
            &laquo;
          </button>
        </li>

        {showLeftEllipsis && (
          <>
            <button
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              onClick={handleLeftEllipsisClick}
            >
              {Math.max(1, startPage - 10 + 1)}
            </button>
            <span className="px-3 h-8 leading-tight text-gray-500">...</span>
          </>
        )}

        {pageNumbers.map((num) => (
          <li key={num}>
            <button
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                num === page ? 'bg-blue-600 text-blue-600 font-bold' : ''
              }`}
              onClick={() => onPageChange(num)}
            >
              {num + 1}
            </button>
          </li>
        ))}

        {showRightEllipsis && (
          <>
            <span className="px-3 h-8 leading-tight text-gray-500">...</span>
            <button
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              onClick={handleRightEllipsisClick}
            >
              {Math.min(totalPages, endPage + 10)}
            </button>
          </>
        )}

        <li>
          <button
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => onPageChange(page + 1)}
            disabled={page + 1 === totalPages || totalPages === 0}
          >
            <span className="sr-only">Next</span>
            &raquo;
          </button>
        </li>
        <li>
          <button
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={() => onPageChange(totalPages - 1)}
            disabled={page + 1 === totalPages || totalPages === 0}
          >
            <span className="sr-only">Last</span>
            &raquo;&raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
