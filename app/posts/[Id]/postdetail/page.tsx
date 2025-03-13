import React from "react";
import Header from "@/app/Header";
import CommentForm from "@/app/components/comments/CommentForm";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = params;
  const postId = Number(id);

  return (
    <>
      <Header />
      <main>
        {/* Blog Section */}
        <div className="bg-gray-200 rounded-lg shadow-md max-w-4xl mx-auto mt-8 p-6">
          {/* Post Title */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Blog Title</h1>
            {/* User Icon */}
            <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
              <span>User</span> {/* 後で画像に置換 */}
            </div>
          </div>

          {/* Placeholder Image  後で画像に置換*/}
          <div className="w-full h-64 bg-gray-400 flex items-center justify-center mb-6">
            <span>Image Placeholder</span>
          </div>

          {/* Post Content */}
          <p className="text-gray-700 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
            Cras venenatis euismod malesuada.
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
            Cras venenatis euismod malesuada.
          </p>
        </div>

        {/* Comments Section */}
        <div className="bg-white max-w-3xl mx-auto mt-8 p-6">
          <CommentForm postId={postId} />
          {/* Sample Comments */}
          <div className="pt-4">
            <div className="flex items-start gap-4 mb-4">
              {/* Comment Box */}
              <div className="bg-gray-100 p-4 rounded-lg w-full flex gap-4">
                {/* User Icon */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex-shrink-0 flex items-center justify-center">
                    <span>Icon</span>
                  </div>
                  <span className="text-gray-700 text-sm mt-1">User</span>
                </div>
                {/* Comment Text */}
                <div className="flex flex-col">
                  <p className="text-gray-800">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit
                    amet, iaculis aliquet nunc.
                  </p>
                  <span className="text-sky-500 text-sm mt-2">a min ago</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-4">
              {/* Comment Box */}
              <div className="bg-gray-100 p-4 rounded-lg w-full flex gap-4">
                {/* User Icon */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex-shrink-0 flex items-center justify-center">
                    <span>Icon</span>
                  </div>
                  <span className="text-gray-700 text-sm mt-1">User</span>
                </div>
                {/* Comment Text */}
                <div className="flex flex-col">
                  <p className="text-gray-800">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit
                    amet, iaculis aliquet nunc.
                  </p>
                  <span className="text-sky-500 text-sm mt-2">a min ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
