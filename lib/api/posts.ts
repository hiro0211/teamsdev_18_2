import { supabase } from "../supabaseClient";

export type PostType = {
  id: number;
  user_id: string;
  category_id: number;
  title: string;
  content: string;
  image_path: string;
  created_at: string;
  updated_at: string;
};

const fetchAllArticles = async (): Promise<PostType[]> => {
  const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error("記事データの取得に失敗しました:", error);
    return [];
  }

  return data;
};

const fetchUserArticles = async (): Promise<PostType[]> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("ログインユーザーの取得に失敗しました:", userError);
    return [];
  }

  const userId = user.id;

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("ユーザーの記事データの取得に失敗しました:", error);
    return [];
  }

  return data;
};

export { fetchAllArticles, fetchUserArticles };
