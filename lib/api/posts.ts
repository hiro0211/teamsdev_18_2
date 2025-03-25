import { supabase } from "../supabaseClient";
import { getCurrentUserId } from "@/lib/api/auth";

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

export const fetchAllArticles = async (): Promise<PostType[]> => {
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

export const fetchUserArticles = async (userId: string): Promise<PostType[]> => {
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

export const createPost = async (
  title: string,
  content: string,
  category_id: number,
  image_path: string = "dummy-image-path.jpg",
) => {
  const user_id = (await getCurrentUserId())!;

  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        user_id,
        title,
        content,
        category_id,
        image_path,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    console.error("記事の作成に失敗しました:", error);
    throw new Error("記事の作成に失敗しました。");
  }

  return data;
};

export const uploadImageToStorage = async (file: File, bucketName: string = "posts") => {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    console.error("画像アップロードに失敗しました:", error);
    throw error;
  }

  return supabase.storage.from(bucketName).getPublicUrl(data.path).data.publicUrl;
};
