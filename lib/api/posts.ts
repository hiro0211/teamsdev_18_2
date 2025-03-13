import { supabase } from "../supabaseClient";

export type PostType = {
  id: number;
  user_id: string;
  user_name: string;
  category_id: number;
  category_name: string;
  title: string;
  content: string;
  image_path: string;
  created_at: string;
  updated_at: string;
};

const fetchAllArticles = async (): Promise<PostType[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select(`*, users(name), categories(name)`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("記事データの取得に失敗しました:", error);
    return [];
  }

  return data.map((post) => ({
    ...post,
    user_name: (post.users as { name: string }).name,
    category_name: (post.categories as { name: string }).name,
  }));
};

const fetchUserArticles = async (userId: string): Promise<PostType[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select(`*, users(name), categories(name)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("ユーザーの記事データの取得に失敗しました:", error);
    return [];
  }

  return data.map((post) => ({
    ...post,
    user_name: (post.users as { name: string }).name,
    category_name: (post.categories as { name: string }).name,
  }));
};

export { fetchAllArticles, fetchUserArticles };
