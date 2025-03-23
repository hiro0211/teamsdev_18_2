"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Pagination from "./components/ui/paginations/Pagination";
import Image from "next/image";
import Header from "./Header";
import { fetchPaginatedPosts } from "@/lib/api/posts";
import { PostType } from "../lib/api/posts";
import Link from "next/link";

dayjs.extend(relativeTime);

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [isSingleColumn, setIsSingleColumn] = useState(false);
  
  // ページが変わるたびに記事を再取得
  useEffect(() => {
    const loadPosts = async () => {
      try {
        // ここで throw new Error(...) され得るので try~catch で囲む
        const { data, total } = await fetchPaginatedPosts(currentPage, itemsPerPage);
        setPosts(data);
        setTotalPosts(total);
      } catch (error) {
        // エラーをキャッチして alert() を表示
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("予期しないエラーが発生しました");
        }
      }
    };
    loadPosts();
  }, [currentPage]);

  // レイアウト切り替え (640px 未満で 1 カラム表示)
  useEffect(() => {
    const handleResize = () => {
      setIsSingleColumn(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col bg-white w-full min-h-screen overflow-x-hidden">
      <Header />
      <div className="p-4 sm:p-8 flex-1 overflow-y-auto">
        {/* 検索フォーム */}
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
              <Image src="/search.svg" alt="Search" width={20} height={20} unoptimized className="cursor-pointer" />
            </div>
          </div>
        </div>

        {/* 記事一覧 (カード表示) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-9 px-4 lg:px-20">
          {posts.map((post, index) => {
            // dayjs を使って相対時間を表示
            const postedAgo = post.created_at ? dayjs(post.created_at).fromNow() : "";

            return (
              <Link
                key={post.id}
                href={`/posts/${post.id}/postdetail`}
                className={`
                  border border-gray-300 rounded-lg shadow-md bg-white 
                  flex flex-col w-full sm:w-4/5 lg:w-3/4 min-w-[250px] max-w-[400px]
                  mx-auto cursor-pointer
                  ${index % 3 === 0 ? "lg:ml-auto lg:mr-0" : index % 3 === 1 ? "lg:mx-auto" : "lg:mr-auto lg:ml-0"}
                `}
              >
                {/* 写真の部分 */}
                <div className="relative w-full h-[200px] bg-gray-300">
                  {post.image_path && (
                    <Image src={post.image_path} alt={post.title} fill style={{ objectFit: "cover" }} unoptimized />
                  )}
                </div>

                {/* タイトル・カテゴリ・著者名・投稿日時 */}
                <div className="flex flex-col justify-between min-h-[120px] p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <span className="text-sm text-blue-500">{post.category_name || post.category_id}</span>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-5">
                    <span className="text-blue-500">{post.user_name}</span>
                    <span>{postedAgo}</span>
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                    {post.content && post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ページネーション */}
        <div className={`mt-10 flex justify-center ${isSingleColumn ? "hidden" : ""}`}>
          <Pagination
            posts={totalPosts}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
