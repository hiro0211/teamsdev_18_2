"use client";

import React from 'react'
import { useState } from 'react';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

  return (
    <header className="bg-gray-300 p-4 flex justify-end">
            {/*認証済 */}
            <div className="flex items-center gap-10">
                <button className="bg-black text-white px-4 py-2 w-32 rounded-full text-center font-bold">
                    Create
                </button>
                <div className="relative">
                    <button
                    onClick={toggleModal}
                    className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center"
                    >
                    P
                    </button>
                    {isModalOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-gray-400 shadow-lg rounded-lg p-2">
                        <button className="w-full border-none bg-transparent text-black px-4 py-2 mt-2 text-center font-bold">User name</button>
                        <button className="w-full bg-red-400 text-black rounded-full px-4 py-2 mt-2 text-center font-bold">
                        Logout
                        </button>
                    </div>
                    )}
                </div>
            </div>
            {/*未認証 */}
            {/* <div className="flex gap-10">
                <button className="border border-gray-600 bg-transparent text-black px-4 py-2 w-32 text-center rounded-full font-bold">Login</button>
                <button className="bg-black text-white px-4 py-2 w-32 text-center rounded-full font-bold">Sign Up</button>
            </div> */}
    </header>
  )
}

export default Header