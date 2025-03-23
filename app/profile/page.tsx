"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Pagination from "../components/ui/paginations/Pagination";
import Header from "../Header";
import { getCurrentUserId } from "@/lib/api/auth";
import { fetchPaginatedPosts, PostType } from "@/lib/api/posts";
import { getCurrentUserId,isAuthenticated } from "@/lib/api/auth";

export default function Profile() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [isSingleColumn, setIsSingleColumn] = useState(false);
  
  // ページが変わるたびに投稿を再取得

    useEffect(() => {
      const checkAuth = async () => {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
          router.push("/login"); 
        }
      };
  
      checkAuth();
    }, [router]);

  useEffect(() => {
    const loadPosts = async () => {
      const userId = await getCurrentUserId();
      if (!userId) return;
      const { data, total } = await fetchPaginatedPosts(currentPage, itemsPerPage, { userId });
      setPosts(data);
      setTotalPosts(total);
    };
    loadPosts();
  }, [currentPage]);

  // レイアウト切り替え
  useEffect(() => {
    const handleResize = () => {
      setIsSingleColumn(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // すでにバックエンドでページ分のみ取得しているのでスライスは不要
  const currentPosts = posts;

  return (
    <div className="flex flex-col bg-white w-full min-h-screen overflow-x-hidden">
      <Header />
      <div className="p-4 sm:p-8 flex-1 overflow-y-auto">
        <div className="flex justify-center items-center mb-12 w-full">
          <h1 className="text-6xl font-bold">Your Post</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-9 px-4 lg:px-20">
          {currentPosts.map((post, index) => (
            <div
              key={post.id}
              className={`border border-gray-300 rounded-lg shadow-md bg-white flex flex-col w-full sm:w-4/5 lg:w-3/4 min-w-[250px] max-w-[400px] aspect-square overflow-hidden mx-auto 
              ${index % 3 === 0 ? "lg:ml-auto lg:mr-0" : index % 3 === 1 ? "lg:mx-auto" : "lg:mr-auto lg:ml-0"}`}
            >
              <div className="w-full h-[200px] bg-gray-300"></div>
              <div className="flex flex-col justify-between h-[100px] p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <span className="text-sm text-blue-500">{post.category_name || post.category_id}</span>
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
