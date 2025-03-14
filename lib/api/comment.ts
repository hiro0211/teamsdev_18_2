import { supabase } from "../supabaseClient";

// コメントを取得する
export const getComments = async (postId: string) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*, user: users(name, id)")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  // エラーが発生した場合はエラーを投げる
  if (error || !data) {
    throw error || new Error("コメントを取得できませんでした。");
  }

  return data;
};

export const addComment = async (postId: number, content: string, userId?: string) => {
  const testUserId = "9f1345cd-7676-4417-aa10-984307474cc8"; //仮UUID設定//TODO:不要になったら削除
  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    content: content,
    user_id: userId || testUserId,
  });

  if (error) {
    console.error("Error inserting comment:", error);
    throw new Error(error.message);
  }

  return { success: true };
};
