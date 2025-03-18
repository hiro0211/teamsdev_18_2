import { supabase } from "../supabaseClient";

// Supabaseからカテゴリ一覧を取得
export const fetchCategories = async () => {
  const { data, error } = await supabase.from("categories").select("id, name");

  if (error) {
    console.error("カテゴリの取得に失敗しました:", error);
    return [];
  }

  return data;
};
