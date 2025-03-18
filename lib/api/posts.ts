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

export type PostUpdateType = {
  category_id: number;
  title: string;
  content: string;
  image_path: string;
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

//記事を更新する
export const updatePost = async (postId: string, data: PostUpdateType) => {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`記事を更新に失敗しました${errorMessage}`);
    }

    return response.json();
  } catch (error) {
    console.error("APIエラー:", error);
    throw error;
  }
};

//カテゴリー一覧を取得
export const fetchCategories = async () => {
  try {
    const { data, error } = await supabase.from("categories").select("id,name");
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("カテゴリーデータの取得に失敗しました", error);
  }
};

export { fetchAllArticles, fetchUserArticles };
