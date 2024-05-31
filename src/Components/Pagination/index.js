import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const buttonClasses =
    "bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  return (
    <div>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={buttonClasses}
      >
        &lt;
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={currentPage === pageNumber}
          className={buttonClasses}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={buttonClasses}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
