import { supabase } from "../supabaseClient";

// 記事詳細を取得する
export const getPostDetail = async (id: string) => {
  const { data, error } = await supabase.from("posts").select("*, user: users(name, id)").eq("id", id).single();

  // エラーが発生した場合はエラーを投げる
  if (error || !data) {
    throw error || new Error("記事を取得できませんでした。");
  }

  return data;
};
