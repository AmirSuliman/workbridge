import React, { FC } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

type Props = {
  totalItems: number;
  pageSize?: number;
  currentPage: number;
  maxPagesToShow?: number;
  setCurrentPage: (page: number) => void;
  styles?: { container: string };
};

export const Pagination: FC<Props> = ({
  totalItems,
  pageSize = 10,
  currentPage,
  maxPagesToShow = 10,
  setCurrentPage,
  styles,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationNumbers = () => {
    const pageNumbers: JSX.Element[] = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
        endPage = maxPagesToShow;
      } else if (currentPage >= totalPages - Math.floor(maxPagesToShow / 2)) {
        startPage = totalPages - maxPagesToShow + 1;
      }
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key="first"
          onClick={() => handlePageChange(1)}
          className="px-4 py-2  border-l border-r border-gray-300 focus:outline-none"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span
            key="start-ellipsis"
            className="px-4 py-2 bg-white border-l border-r border-gray-300"
          >
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 rounded-[6px] text-sm py-2 ${
            currentPage === i ? 'bg-dark-navy text-white border-0' : 'bg-white'
          } border border-light-gray hover:bg-dark-navy hover:text-white focus:outline-none`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span
            key="end-ellipsis"
            className="px-4 py-2 bg-white border  border-light-gray rounded-[6px]"
          >
            ...
          </span>
        );
      }
      pageNumbers.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2bg-white  border border-light-gray rounded-[6px] focus:outline-none"
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div
      className={`${styles?.container} flex  justify-center bg-white rounded-md text-sm`}
    >
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 border border-light-gray rounded-[6px] ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white'
        } focus:outline-none`}
      >
        <MdKeyboardArrowLeft className="text-dark-navy" />
      </button>
      {renderPaginationNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 border border-light-gray rounded-[6px]  ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white'
        } focus:outline-none`}
      >
        <MdKeyboardArrowRight className="text-dark-navy" />
      </button>
    </div>
  );
};
