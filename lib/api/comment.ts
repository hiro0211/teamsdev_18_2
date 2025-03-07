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
