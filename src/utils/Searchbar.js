import React from "react";

const Searchbar = ({ setKeyword }) => {
  return (
    <div className="container h-24 flex">
      <div className="relative">
        {" "}
        <input
          type="text"
          className="h-14 w-96 pr-8 pl-5 z-0 focus:shadow focus:outline-none border-2 border-gray-300 bg-white rounded-lg"
          placeholder="Search stock code (e.g. 388 HK)"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="absolute top-4 right-3">
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="text-gray-600 fill-current cursor-text"
          >
            <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
          </svg>{" "}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
