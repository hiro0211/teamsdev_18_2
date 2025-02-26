"use client";

import { useState } from "react";

interface Props {
  posts: number;
  itemsPerPage?: number;
}

const Pagination = ({ posts, itemsPerPage = 3 }: Props) => {
  const totalPages = Math.max(1, Math.ceil(posts / itemsPerPage));
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        className="px-6 py-2 mr-10 min-w-[150px] rounded-full text-center font-bold"
      >
        ← Previous Page
      </button>

      <div className="flex space-x-4 items-center justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 ${
              currentPage === num ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
        className="px-6 py-2 ml-10 min-w-[150px] rounded-full text-center font-bold"
      >
        Next Page →
      </button>
    </div>
  );
};

export default Pagination;
