"use client";

import { useState, useEffect } from "react";
import Pagination from "./components/ui/paginations/Pagination";
import Image from "next/image";
import Header from "./Header";
import { fetchAllArticles, PostType, PostSearch } from "../lib/api/posts";

const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [isSingleColumn, setIsSingleColumn] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(""); 

  useEffect(() => {
    const loadPosts = async () => {
      const articles = await fetchAllArticles();
      setPosts(articles);
    };

    loadPosts();
  }, []);

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

  // 検索処理
  const handleSearch = async () => {
    try {
      const searchResult = await PostSearch(searchKeyword);
      setPosts(searchResult);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("予期しないエラーが発生しました");
      }
    }
  }

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
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <div className={`${isSingleColumn ? "absolute right-3 top-1/2 transform -translate-y-1/2" : "ml-3"}`}>
              <Image src="/search.svg" alt="Search" width={20} height={20} className="cursor-pointer" onClick={handleSearch}/>
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
                  <span className="text-sm text-blue-500">{post.category_name}</span>
                </div>
                <p className="text-sm text-gray-500">
                  {post.user_name} ・ {new Date(post.updated_at).toLocaleDateString()}
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
