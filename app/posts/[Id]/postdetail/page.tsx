import React from "react";
import Header from "../../../Header";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getPostDetail } from "@/lib/api/posts";
import { getComments } from "@/lib/api/comment";
import { MessageSquare } from "lucide-react";
import CommentForm from "@/app/components/comments/CommentForm";

dayjs.extend(relativeTime);

type PostDetailPageProps = {
  params: Promise<{ id: string }>
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = (await params) ?? {};
  const postId = Number(id);

  const postDetail = await getPostDetail(id);
  const comments = await getComments(id);

  return (
    <>
      <Header />
      <main>
        {/* Blog Section */}
        <div className="bg-gray-200 rounded-lg shadow-md max-w-4xl mx-auto mt-8 p-6">
          {/* Post Title */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{postDetail.title}</h1>
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
          <p className="text-gray-700 mb-6">{postDetail.content}</p>
        </div>

        {/* Comments Section */}
        <div className="bg-white max-w-3xl mx-auto mt-8 p-6">
          <CommentForm postId={postId} />

          {/* Sample Comments */}
          <div className="pt-4">
            {comments.length === 0 ? (
              <div className="text-gray-500 border border-gray-200 bg-gray-50 rounded-md p-6 text-center">
                <MessageSquare className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                <p>まだコメントはありません</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-gray-100 p-4 rounded-lg w-full flex gap-4">
                      {/* User Icon */}
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-400 flex-shrink-0 flex items-center justify-center">
                          <span>Icon</span>
                        </div>
                        <span className="text-gray-700 text-sm mt-1">{comment.user?.name ?? "User"}</span>
                      </div>
                      {/* Comment Text */}
                      <div className="flex flex-col">
                        <p className="text-gray-800">{comment.content}</p>
                        <span className="text-sky-500 text-sm mt-2">{dayjs(comment.created_at).fromNow()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}

