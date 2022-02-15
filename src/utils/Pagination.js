import React, { useEffect, useState } from "react";

const Pagination = ({ currentPage, rowsPerPage, totalData, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [displayPageNumbers, setDisplayPageNumbers] = useState([]);

  useEffect(() => {
    let tempPageNumbers = [...pageNumbers];

    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (pageNumbers.length <= 5) {
      tempPageNumbers = [...pageNumbers];
    } else {
      if (currentPage >= 1 && currentPage <= 3) {
        tempPageNumbers = [1, 2, 3, 4, dotsInitial, pageNumbers.length];
      } else if (currentPage === 4) {
        const sliced = pageNumbers.slice(0, 5);
        tempPageNumbers = [...sliced, dotsInitial, pageNumbers.length];
      } else if (currentPage > 4 && currentPage < pageNumbers.length - 2) {
        // from 5 to 8 -> (10 - 2)
        const sliced1 = pageNumbers.slice(currentPage - 2, currentPage); // sliced (5-2, 5) -> [4, 5]
        const sliced2 = pageNumbers.slice(currentPage, currentPage + 1); // sliced (5, 5+1) -> [6]
        tempPageNumbers = [
          1,
          dotsLeft,
          ...sliced1,
          ...sliced2,
          dotsRight,
          pageNumbers.length,
        ]; // [1, '...', 4, 5, 6, '...', 10]
      } else if (currentPage > pageNumbers.length - 3) {
        // > 7
        const sliced = pageNumbers.slice(pageNumbers.length - 4); // slice(10-4)
        tempPageNumbers = [1, dotsLeft, ...sliced];
      } else if (currentPage === dotsInitial) {
        // [1, 2, 3, 4, "...", 10].length = 6 - 3 = 3
        // displayPageNumbers[3] = 4 + 1 = 5
        // or
        // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
        // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
        paginate(displayPageNumbers[displayPageNumbers.length - 3] + 1);
      } else if (currentPage === dotsRight) {
        paginate(displayPageNumbers[3] + 2);
      } else if (currentPage === dotsLeft) {
        paginate(displayPageNumbers[3] - 2);
      }
    }

    setDisplayPageNumbers(tempPageNumbers);
  }, [currentPage, totalData]);

  const perviousPage = () => {
    if (currentPage > 1) paginate(currentPage - 1);
  };
  const nextPage = () => {
    if (currentPage < pageNumbers.length) paginate(currentPage + 1);
  };

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-2">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          onClick={perviousPage}
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          {` Previous `}
        </a>
        <a
          onClick={nextPage}
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          {` Next `}
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium ml-1 mr-1">
              {`${(currentPage - 1) * rowsPerPage + 1} - ${
                currentPage * rowsPerPage > totalData ? totalData : currentPage * rowsPerPage
              }`}
            </span>
            of
            <span className="font-medium ml-1 mr-1">{totalData}</span>
            results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              onClick={perviousPage}
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            {displayPageNumbers.map((number) => {
              return (
                <a
                  key={number}
                  aria-current="page"
                  onClick={() => paginate(number)}
                  href="#"
                  className={`${
                    number === currentPage
                      ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 inline-flex"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex"
                  } relative items-center px-4 py-2 border text-sm font-medium`}
                >
                  {number}
                </a>
              );
            })}
            <a
              onClick={nextPage}
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
