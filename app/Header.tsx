"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../lib/api/auth"; // 追加

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter(); // 追加

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = async () => {
    try {
      await logout(); // logout 関数を実行（失敗したら throw される）
      router.push("/login");
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  return (
    <header className="bg-gray-300 p-4 flex justify-end">
      <div className="flex items-center gap-10">
        <button className="bg-black text-white px-4 py-2 w-32 rounded-full text-center font-bold">Create</button>
        <div className="relative">
          <button
            onClick={toggleModal}
            className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center"
          >
            P
          </button>
          {isModalOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-400 shadow-lg rounded-lg p-2">
              <button className="w-full border-none bg-transparent text-black px-4 py-2 mt-2 text-center font-bold">
                User name
              </button>
              <button
                onClick={handleLogout} // ここだけ追加！
                className="w-full bg-red-400 text-black rounded-full px-4 py-2 mt-2 text-center font-bold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
