import { useMemo } from "react";
import styles from "./Pager.module.scss";

interface PagerProps {
  handlePageChange: (newPage: number) => () => void;
  isLoading: boolean;
  page: number;
  hasMorePages: boolean;
}

const Pager = ({
  handlePageChange,
  isLoading,
  page,
  hasMorePages,
}: PagerProps) => {
  const renderPagination = useMemo(() => {
    const paginationItems = [];
    const pageNeighbours = 2;
    const ellipsis = <span key="ellipsis">...</span>;

    const leftBoundary = Math.max(1, page - pageNeighbours);
    const rightBoundary = page + pageNeighbours;

    if (leftBoundary > 1) {
      paginationItems.push(
        <button
          key={1}
          className={`${styles.paginationButton} ${
            1 === page ? styles.active : ""
          }`}
          onClick={handlePageChange(1)}
          disabled={isLoading}
        >
          1
        </button>
      );
      if (leftBoundary > 2) {
        paginationItems.push(ellipsis);
      }
    }

    for (let i = leftBoundary; i <= rightBoundary; i++) {
      paginationItems.push(
        <button
          key={i}
          className={`${styles.paginationButton} ${
            page === i ? styles.active : ""
          }`}
          onClick={handlePageChange(i)}
          disabled={isLoading || i === page}
        >
          {i}
        </button>
      );
    }

    return paginationItems;
  }, [page, isLoading, handlePageChange]);

  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.paginationButton}
        onClick={handlePageChange(Math.max(1, page - 1))}
        disabled={page <= 1 || isLoading}
      >
        «
      </button>
      {renderPagination}
      <button
        className={styles.paginationButton}
        onClick={handlePageChange(page + 1)}
        disabled={!hasMorePages || isLoading}
      >
        »
      </button>
    </div>
  );
};

export default Pager;
