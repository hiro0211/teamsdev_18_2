"use client";

import { useState } from "react";
import Pagination from "./components/ui/paginations/Pagination";

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
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="mt-auto mb-10 hidden md:block">
        <Pagination posts={posts.length} />
      </div>
    </div>
  );
};

export default Home;
