"use client";

import { useState } from "react";
import Header from "./Header";

const Home = () => {
  const [posts] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      title: `Post Title ${i + 1}`,
      author: "Author",
      category: "Category",
      time: "2 mins ago",
    }))
  );

  return (
    <div className="min-h-screen bg-white-100">
      <Header />

      {/* 検索バー */}
      <div className="flex justify-center my-4 items-center">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 bg-gray-200 border border-black rounded-full w-1/3"
        />
        <span className="ml-2">
          <img
            src="/search.svg"
            alt="Search"
            style={{ width: "15px", height: "15px" }}
          />
        </span>
      </div>

      {/* 投稿一覧 */}
      <div className="grid grid-cols-3 gap-6 px-10">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white aspect-square border border-black rounded"
          >
            <div className="bg-gray-300 h-60 mb-4 border border-black"></div>
            <h2 className="font-bold">{post.title}</h2>
            <p className="text-sm text-gray-500">
              {post.author} ・ {post.time}
            </p>
            <span className="text-blue-500 text-sm">{post.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
