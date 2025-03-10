"use client";

import { useState } from "react";
import { addComment } from "@/lib/api/comment";

export default function CommentForm({ postId }: { postId: number }) {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      await addComment(postId, comment);
      alert("コメントを投稿しました");
      setComment("");
    } catch (error) {
      console.error(error);
      alert("コメントの投稿に失敗しました");
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <div className="mb-6 flex">
        <input
          type="text"
          placeholder="Your Comment..."
          className="flex-grow p-2 border border-gray-300 rounded-lg mr-4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleCommentSubmit}>
          Comment
        </button>
      </div>
    </>
  );
}
