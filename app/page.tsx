"use client";

import { useState, useEffect } from "react";
import Pagination from "./components/ui/paginations/Pagination";
import Header from "./Header";

const Home = () => {
  const [posts] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      title: `Post Title ${i + 1}`,
      author: "Author",
      category: "Category",
      time: "2 mins ago",
    })),
  );

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [isSingleColumn, setIsSingleColumn] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSingleColumn(window.innerWidth < 640); // 640px未満なら1列
    };

    handleResize(); // 初回実行
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = isSingleColumn ? posts : posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="flex flex-col bg-white w-full min-h-screen overflow-x-hidden">
      <Header />
      <div className="p-4 sm:p-8 flex-1 overflow-y-auto">
        <div className="flex justify-center items-center mb-12 w-full">
          <div className={`relative w-full max-w-md flex ${isSingleColumn ? "" : "items-center"}`}>
            <input
              type="text"
              placeholder="Search..."
              className={`w-full px-4 py-2 bg-gray-300 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isSingleColumn ? "pr-10" : ""
              }`}
            />
            <div className={`${isSingleColumn ? "absolute right-3 top-1/2 transform -translate-y-1/2" : "ml-3"}`}>
              <img src="/search.svg" alt="Search" className="w-5 h-5 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-9 px-4 lg:px-20">
          {currentPosts.map((post, index) => (
            <div
              key={post.id}
              className={`border border-gray-300 rounded-lg shadow-md bg-white flex flex-col w-full sm:w-4/5 lg:w-3/4 min-w-[250px] max-w-[400px] aspect-square overflow-hidden mx-auto 
              ${index % 3 === 0 ? "lg:ml-auto lg:mr-0" : index % 3 === 1 ? "lg:mx-auto" : "lg:mr-auto lg:ml-0"}
              `}
            >
              <div className="w-full h-[200px] bg-gray-300"></div>
              <div className="flex flex-col justify-between h-[100px] p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <span className="text-sm text-blue-500">{post.category}</span>
                </div>
                <p className="text-sm text-gray-500">
                  {post.author} ・ {post.time}
                </p>
                <div className="w-full h-3 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-10 flex justify-center ${isSingleColumn ? "hidden" : ""}`}>
          <Pagination
            posts={posts.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
