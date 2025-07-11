import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({
  page,
  totalPages,
  onPageChange,
}) => {
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
    <div className={styles.paginationContainer}>
      <button
        className={styles.pageButton}
        onClick={() => onPageChange(0)}
        disabled={page === 0}
      >
        İlk
      </button>

      <button
        className={styles.pageButton}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
      >
        Önceki
      </button>

      {showLeftEllipsis && (
        <>
          <button
            className={styles.pageButton}
            onClick={handleLeftEllipsisClick}
          >
            {Math.max(1, startPage - 10 + 1)}
          </button>
          <span className={styles.ellipsis}>...</span>
        </>
      )}

      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`${styles.pageButton} ${
            num === page ? styles.pageButtonActive : ''
          }`}
          onClick={() => onPageChange(num)}
        >
          {num + 1}
        </button>
      ))}

      {showRightEllipsis && (
        <>
          <span className={styles.ellipsis}>...</span>
          <button
            className={styles.pageButton}
            onClick={handleRightEllipsisClick}
          >
            {Math.min(totalPages, endPage + 10)}
          </button>
        </>
      )}

      <button
        className={styles.pageButton}
        onClick={() => onPageChange(page + 1)}
        disabled={page + 1 === totalPages || totalPages === 0}
      >
        Sonraki
      </button>

      <button
        className={styles.pageButton}
        onClick={() => onPageChange(totalPages - 1)}
        disabled={page + 1 === totalPages || totalPages === 0}
      >
        Son
      </button>
    </div>
  );
};

export default Pagination;
