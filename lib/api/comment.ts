import { supabase } from "../supabaseClient";

export const addComment = async (postId: number, content: string, userId?: string) => {
  const testUserId = "9f1345cd-7676-4417-aa10-984307474cc8"; // 仮のUUIDを設定
  const { error } = await supabase.from("comments").insert([
    {
      post_id: postId,
      content: content,
      user_id: userId || testUserId,
    },
  ]);

  if (error) {
    console.error("Error inserting comment:", error);
    throw new Error(error.message);
  }

  return { success: true };
};
